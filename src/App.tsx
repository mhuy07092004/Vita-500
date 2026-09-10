import { useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './page/home'
import New from './page/new'
import Game from './page/game'
import About from './page/about'
import Buy from './page/buy'
import Footer from './components/footer'
import Navbar from './components/navbar'
import PageTransition from './components/page-transition'
import usePagePreload from './hooks/use-page-preload'
import { useBuyUnlocked, useTrackPageViewed } from './lib/buy-unlock'

function App() {
  const location = useLocation()
  const pageRef = useRef<HTMLDivElement>(null)
  const buyUnlocked = useBuyUnlocked()
  usePagePreload()
  useTrackPageViewed(location.pathname, pageRef)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <div ref={pageRef} className="relative">
        <AnimatePresence initial={false}>
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/game" element={<Game />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/buy"
                element={buyUnlocked ? <Buy /> : <Navigate to="/" replace />}
              />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </div>
      <Footer />
    </>
  )
}

export default App
