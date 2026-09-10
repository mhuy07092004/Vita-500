import { NavLink } from 'react-router-dom'
import logo from '../assets/Logo.jpg'

const ABOUT_LINKS = [
  { label: 'Who we are', to: '/about' },
  { label: 'Our story', to: null },
  { label: 'FAQ', to: null },
  { label: 'Careers', to: null },
] as const

const linkClass =
  'inline-flex items-center gap-2 text-[#FED7AA] transition-colors hover:text-[#FB923C]'

function Footer() {
  return (
    <footer className="bg-[#1F2937]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-8 px-5 py-10 text-center sm:grid-cols-2 sm:justify-items-start sm:px-8 sm:text-left lg:grid-cols-4 lg:gap-10 lg:py-14">
        <div>
          <NavLink to="/" aria-label="Vita500 home">
            <img
              src={logo}
              alt="Vita500"
              className="h-20 w-20 rounded-full object-cover md:h-28 md:w-28"
            />
          </NavLink>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">About</h2>
          <ul className="mt-4 flex flex-col items-center gap-3 text-[#E5E7EB] sm:items-start">
            {ABOUT_LINKS.map(({ label, to }) => (
              <li key={label}>
                {to ? (
                  <NavLink to={to} className={linkClass}>
                    {label}
                  </NavLink>
                ) : (
                  <a
                    href="#"
                    onClick={(event) => event.preventDefault()}
                    className={linkClass}
                  >
                    {label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">Contact Us</h2>
          <ul className="mt-4 flex flex-col items-center gap-3 text-[#E5E7EB] sm:items-start">
            <li>
              <a href="mailto:contactus@vita500.com" className={linkClass}>
                <EmailIcon />
                Email
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/jacky.doan.5"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <FacebookIcon />
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/phuc___d"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <InstagramIcon />
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-lg font-semibold text-white">Email</h2>
          <p className="mt-4 text-sm text-[#E5E7EB]">
            Subscribe to receive the latest promotions.
          </p>
          <form
            className="mt-4 flex w-full flex-col gap-3"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="rounded-md border border-[#E5E7EB]/30 bg-transparent px-3 py-2 text-sm text-[#E5E7EB] placeholder:text-[#E5E7EB]/60 outline-none focus:border-[#FED7AA]"
            />
            <button
              type="submit"
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#E5E7EB]"
            >
              Receive latest promotion
            </button>
          </form>
        </div>
      </div>
    </footer>
  )
}

function EmailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 fill-current"
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 fill-current"
    >
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.4V9.89c0-2.38 1.41-3.69 3.57-3.69 1.03 0 2.12.18 2.12.18v2.33h-1.2c-1.18 0-1.55.73-1.55 1.48v1.78h2.64l-.42 2.89h-2.22V21.95c4.78-.75 8.44-4.89 8.44-9.88Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 fill-current"
    >
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2Zm8.4 1.8H7.8c-2.2 0-4 1.8-4 4v8.4c0 2.2 1.8 4 4 4h8.4c2.2 0 4-1.8 4-4V7.8c0-2.2-1.8-4-4-4ZM12 7.3A4.7 4.7 0 1 1 7.3 12 4.7 4.7 0 0 1 12 7.3Zm0 1.8A2.9 2.9 0 1 0 14.9 12 2.9 2.9 0 0 0 12 9.1Zm5.35-2.55a1.15 1.15 0 1 1-1.15-1.15 1.15 1.15 0 0 1 1.15 1.15Z" />
    </svg>
  )
}

export default Footer
