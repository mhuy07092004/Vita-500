type ButtonProps = {
  href?: string
  className?: string
}

function Button({ href = '#', className = '' }: ButtonProps) {
  return (
    <a
      href={href}
      aria-label="Add to cart, only on our website"
      className={`@container relative flex w-full items-center overflow-hidden rounded-full no-underline select-none transition-transform duration-200 hover:scale-[1.03] active:scale-[0.99] ${className}`.trim()}
      style={{
        aspectRatio: 'var(--btn-aspect, 3.38 / 1)',
        background:
          'linear-gradient(180deg, #ff5d5f 0%, #f0343c 32%, #e11d2a 68%, #c81622 100%)',
        boxShadow: [
          '0 2px 0 #8f101c',
          '0 8px 16px rgba(120, 10, 18, 0.38)',
          'inset 0 1px 0 rgba(255, 255, 255, 0.48)',
          'inset 0 -3px 6px rgba(110, 0, 16, 0.38)',
        ].join(', '),
      }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[1.4%] top-[7%] h-[45%] rounded-full"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.08) 72%, transparent 100%)',
        }}
      />

      <span className="relative ml-[7.5%] flex h-[15cqi] w-[15cqi] shrink-0 items-center justify-center text-white">
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
          <path
            d="M3.4 5h2.05l.7 2.45h12.9a1.05 1.05 0 0 1 1.02 1.3l-1.45 6.2a1.7 1.7 0 0 1-1.66 1.3H9.05A1.7 1.7 0 0 1 7.4 15.3L5.35 7.45 4.9 5.9H3.4"
            stroke="currentColor"
            strokeWidth="1.85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9.7" cy="19.15" r="1.45" fill="currentColor" />
          <circle cx="16.55" cy="19.15" r="1.45" fill="currentColor" />
        </svg>
      </span>

      <span className="relative ml-[3.2%] mr-[6%] flex min-w-0 flex-col justify-center whitespace-nowrap leading-none text-white">
        <span className="text-[8.3cqi] font-extrabold tracking-[0.04em]">
          ADD TO CART
        </span>
        <span className="mt-[0.45em] text-[3.7cqi] font-medium tracking-[0.01em] text-white/95">
          Only on our website &gt;
        </span>
      </span>
    </a>
  )
}

export default Button
