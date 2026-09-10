import { Route, Routes } from 'react-router-dom'
import Home from './page/home'
import New from './page/new'
import Game from './page/game'
import About from './page/about'
import Buy from './page/buy'
import Footer from './components/footer'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/game" element={<Game />} />
        <Route path="/about" element={<About />} />
        <Route path="/buy" element={<Buy />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
