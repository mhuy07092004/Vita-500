import desktopBg from '../assets/desktop/new/New.jpg'
import mobileBg from '../assets/mobile/new/New.png'

function New() {
  return (
    <div className="relative">
      <section>
        <picture className="block w-full">
          <source media="(min-width: 768px)" srcSet={desktopBg} />
          <img
            src={mobileBg}
            alt="Vita500 - Đủ sức hôm nay, đủ khoẻ ngày mai"
            fetchPriority="high"
            decoding="async"
            className="block h-auto w-full max-w-full"
          />
        </picture>
      </section>
    </div>
  )
}

export default New
