import desktopBg from '../assets/desktop/about/About.jpg'
import mobileBg from '../assets/mobile/about/About.png'
import Navbar from '../components/navbar'

function About() {
  return (
    <div className="relative">
      <Navbar />
      <section>
        <picture className="block w-full">
          <source media="(min-width: 768px)" srcSet={desktopBg} />
          <img
            src={mobileBg}
            alt="Vita500 - About"
            className="block h-auto w-full max-w-full"
          />
        </picture>
      </section>
    </div>
  )
}

export default About
