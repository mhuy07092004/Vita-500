import desktopBg from '../assets/desktop/home/Home.jpg'
import mobileBg from '../assets/mobile/home/Home.png'
import Navbar from '../components/navbar'

function Home() {
  return (
    <div className="relative">
      <Navbar />
      <section>
        <picture className="block w-full">
          <source media="(min-width: 768px)" srcSet={desktopBg} />
          <img
            src={mobileBg}
            alt="Vita500 - My Good Energy Good Luck"
            className="block h-auto w-full max-w-full"
          />
        </picture>
      </section>
    </div>
  )
}

export default Home
