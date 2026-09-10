import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/Logo.jpg'

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'New', path: '/new' },
  { label: 'Game', path: '/game' },
  { label: 'About', path: '/about' },
  { label: 'Buy', path: '/buy' },
] as const

const MOBILE_NAV_ITEMS = NAV_ITEMS.filter((item) => item.path !== '/buy')

function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header className="absolute left-0 top-0 z-20 w-full md:w-fit">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
        className="fixed left-[max(0.75rem,env(safe-area-inset-left))] top-[max(0.75rem,env(safe-area-inset-top))] z-50 md:hidden"
      >
        <img
          src={logo}
          alt="Vita500"
          className="h-16 w-16 rounded-full object-cover shadow-lg"
        />
      </button>

      <div className="relative hidden h-[4.75rem] items-center rounded-br-[6.5rem] bg-[#e15b28] pl-8 pr-10 md:flex">
        <NavLink
          to="/"
          aria-label="Vita500 home"
          className="absolute left-8 top-1/2 z-20 -translate-y-[38%]"
        >
          <img
            src={logo}
            alt="Vita500"
            className="h-24 w-24 rounded-full object-cover"
          />
        </NavLink>
        <nav className="ml-32">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    isActive
                      ? 'border-b-2 border-white pb-0.5 text-lg font-semibold text-[#ffe566]'
                      : 'text-lg font-medium text-white'
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div
        id="mobile-nav"
        {...(!open ? { inert: true } : {})}
        className={`fixed inset-0 z-40 flex flex-col bg-[#e15b28] transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] p-2 text-white"
        >
          <CloseIcon />
        </button>
        <nav className="flex flex-1 items-center justify-center">
          <ul className="flex flex-col items-center gap-10">
            {MOBILE_NAV_ITEMS.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-4xl font-semibold text-[#ffe566]'
                      : 'text-4xl font-medium text-white'
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8 stroke-current"
      fill="none"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export default Navbar
