import desktopBg from '../assets/desktop/Buy_background.png'
import mobileBg from '../assets/mobile/buybackground.png'
import Button from '../components/button'

const BUY_CHECKOUT_URL =
  'https://www.businessinsider.com/stonks-meme-origin-stocks-dogecoin-gamestop-hold-line-memes-game-2021-1'

function Buy() {
  return (
    <div className="relative">
      <section className="relative">
        <picture className="block w-full">
          <source media="(min-width: 768px)" srcSet={desktopBg} />
          <img
            src={mobileBg}
            alt="Buy Vita500"
            fetchPriority="high"
            decoding="async"
            className="block h-auto w-full max-w-full"
          />
        </picture>
        <div className="absolute bottom-[7%] left-1/2 w-[62%] -translate-x-1/2 [--btn-aspect:4.35/1] md:hidden">
          <Button href={BUY_CHECKOUT_URL} />
        </div>
        <div className="absolute bottom-[6.6%] left-[56.5%] hidden w-[23.6%] md:block">
          <Button href={BUY_CHECKOUT_URL} />
        </div>
      </section>
    </div>
  )
}

export default Buy
