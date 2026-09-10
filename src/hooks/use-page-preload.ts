import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { prefetchPage, preloadAllPages } from '../lib/preload-pages'

function usePagePreload() {
  const { pathname } = useLocation()

  useEffect(() => {
    prefetchPage(pathname)
  }, [pathname])

  useEffect(() => {
    const run = () => preloadAllPages()

    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(run, { timeout: 2500 })
      return () => cancelIdleCallback(id)
    }

    const id = window.setTimeout(run, 400)
    return () => window.clearTimeout(id)
  }, [])
}

export default usePagePreload
