import homeDesktop from '../assets/desktop/home/Home.jpg'
import homeMobile from '../assets/mobile/home/Home.png'
import newDesktop from '../assets/desktop/new/New.jpg'
import newMobile from '../assets/mobile/new/New.png'
import aboutDesktop from '../assets/desktop/about/About.jpg'
import aboutMobile from '../assets/mobile/about/About.png'
import desktopCenterBg from '../assets/desktop/minigame/Center_background.jpg'
import desktopLeftBg from '../assets/desktop/minigame/Left_background .jpg'
import desktopRightBg from '../assets/desktop/minigame/Right_background.jpg'
import mobileCenterBg from '../assets/mobile/minigame/Background with the character in the center (phone aspect ratio).jpg'
import mobileLeftBg from '../assets/mobile/minigame/Left_Background.jpg'
import mobileRightBg from '../assets/mobile/minigame/Righ_Background.jpg'
import characterCenter from '../assets/character/Character (in the middle).png'
import characterLeft from '../assets/character/Character (when dragged to the left).png'
import characterRight from '../assets/character/Character (when dragged to the right).png'

const DESKTOP_MQ = '(min-width: 768px)'

type PageAssets = {
  desktop: string[]
  mobile: string[]
}

const PAGE_ASSETS: Record<string, PageAssets> = {
  '/': { desktop: [homeDesktop], mobile: [homeMobile] },
  '/new': { desktop: [newDesktop], mobile: [newMobile] },
  '/about': { desktop: [aboutDesktop], mobile: [aboutMobile] },
  '/game': {
    desktop: [
      desktopCenterBg,
      desktopLeftBg,
      desktopRightBg,
      characterCenter,
      characterLeft,
      characterRight,
    ],
    mobile: [
      mobileCenterBg,
      mobileLeftBg,
      mobileRightBg,
      characterCenter,
      characterLeft,
      characterRight,
    ],
  },
}

const preloaded = new Set<string>()

function isDesktopViewport() {
  return window.matchMedia(DESKTOP_MQ).matches
}

export function assetsForPath(path: string) {
  const assets = PAGE_ASSETS[path]
  if (!assets) return []
  return isDesktopViewport() ? assets.desktop : assets.mobile
}

export function preloadImages(urls: string[]) {
  urls.forEach((url) => {
    if (preloaded.has(url)) return
    preloaded.add(url)

    const img = new Image()
    img.decoding = 'async'
    img.src = url
  })
}

export function prefetchPage(path: string) {
  preloadImages(assetsForPath(path))
}

export function preloadAllPages() {
  Object.keys(PAGE_ASSETS).forEach((path) => prefetchPage(path))
}
