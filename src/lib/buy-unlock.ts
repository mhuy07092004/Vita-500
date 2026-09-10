import { useEffect, useSyncExternalStore, type RefObject } from 'react'

export const REQUIRED_PAGE_PATHS = ['/', '/new', '/game', '/about'] as const

export type RequiredPagePath = (typeof REQUIRED_PAGE_PATHS)[number]

const STORAGE_KEY = 'vita500-viewed-pages'

type Listener = () => void

const listeners = new Set<Listener>()

function readStoredPages(): Set<string> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((item) => typeof item === 'string'))
  } catch {
    return new Set()
  }
}

let viewedPages = readStoredPages()

function emit() {
  listeners.forEach((listener) => listener())
}

function persist() {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...viewedPages]))
}

export function isRequiredPage(path: string): path is RequiredPagePath {
  return (REQUIRED_PAGE_PATHS as readonly string[]).includes(path)
}

export function markPageViewed(path: string) {
  if (!isRequiredPage(path) || viewedPages.has(path)) return
  viewedPages = new Set(viewedPages)
  viewedPages.add(path)
  persist()
  emit()
}

export function isBuyUnlocked() {
  return REQUIRED_PAGE_PATHS.every((path) => viewedPages.has(path))
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useBuyUnlocked() {
  return useSyncExternalStore(subscribe, isBuyUnlocked, () => false)
}

function pageContentReachedEnd(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  return rect.bottom <= window.innerHeight + 72
}

export function useTrackPageViewed(
  pathname: string,
  pageRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!isRequiredPage(pathname)) return

    let marked = false
    let frame = 0

    const tryMark = () => {
      if (marked) return
      const element = pageRef.current
      if (!element) return
      if (element.getBoundingClientRect().height < 80) return
      if (!pageContentReachedEnd(element)) return
      marked = true
      markPageViewed(pathname)
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(tryMark)
    }

    const element = pageRef.current
    const resizeObserver =
      element && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(schedule)
        : null
    if (element && resizeObserver) resizeObserver.observe(element)

    const images = element ? [...element.querySelectorAll('img')] : []
    images.forEach((image) => {
      if (!image.complete) image.addEventListener('load', schedule)
    })

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
    const timeout = window.setTimeout(schedule, 400)

    return () => {
      marked = true
      cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
      resizeObserver?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      images.forEach((image) => image.removeEventListener('load', schedule))
    }
  }, [pageRef, pathname])
}
