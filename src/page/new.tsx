import desktopBg from '../assets/desktop/new/New.jpg'
import mobileBg from '../assets/mobile/new/New.png'
import Navbar from '../components/navbar'

function New() {
  return (
    <div className="relative">
      <Navbar />
      <section>
        <picture className="block w-full">
          <source media="(min-width: 768px)" srcSet={desktopBg} />
          <img
            src={mobileBg}
            alt="Vita500 - Đủ sức hôm nay, đủ khoẻ ngày mai"
            className="block h-auto w-full max-w-full"
          />
        </picture>
      </section>
    </div>
  )
}

export default New
