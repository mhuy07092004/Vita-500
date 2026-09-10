import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
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

function App() {
  const location = useLocation()
  usePagePreload()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <div className="relative">
        <AnimatePresence initial={false}>
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/game" element={<Game />} />
              <Route path="/about" element={<About />} />
              <Route path="/buy" element={<Buy />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </div>
      <Footer />
    </>
  )
}

export default App
