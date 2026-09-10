import desktopBg from '../assets/desktop/minigame/Center_background.jpg'
import mobileBg from '../assets/mobile/minigame/Background with the character in the center (phone aspect ratio).jpg'
import Navbar from '../components/navbar'

function Game() {
  return (
    <div className="relative">
      <Navbar />
      <section>
        <picture className="block w-full">
          <source media="(min-width: 768px)" srcSet={desktopBg} />
          <img
            src={mobileBg}
            alt="Vita500 - Minigame"
            className="block h-auto w-full max-w-full"
          />
        </picture>
      </section>
    </div>
  )
}

export default Game
