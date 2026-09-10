import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
} from 'framer-motion'

export type Zone = 'left' | 'center' | 'right'

export type ZoneAssets = Record<Zone, string>

type CharacterDragSceneProps = {
  desktopBackgrounds: ZoneAssets
  mobileBackgrounds: ZoneAssets
  character: ZoneAssets
}

const ZONES: Zone[] = ['left', 'center', 'right']
const THRESHOLD_RATIO = 0.35
const SNAP_SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 }
const BG_CROSSFADE = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }
const CHAR_CROSSFADE = { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }

function snapX(zone: Zone, maxOffset: number) {
  if (zone === 'left') return -maxOffset
  if (zone === 'right') return maxOffset
  return 0
}

function zoneFromX(value: number, maxOffset: number): Zone {
  if (maxOffset <= 0) return 'center'
  const threshold = maxOffset * THRESHOLD_RATIO
  if (value <= -threshold) return 'left'
  if (value >= threshold) return 'right'
  return 'center'
}

function CharacterDragScene({
  desktopBackgrounds,
  mobileBackgrounds,
  character,
}: CharacterDragSceneProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const characterRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const zoneRef = useRef<Zone>('center')
  const maxOffsetRef = useRef(0)

  const x = useMotionValue(0)
  const [zone, setZone] = useState<Zone>('center')
  const [maxOffset, setMaxOffset] = useState(0)

  const updateZone = useCallback((next: Zone) => {
    if (zoneRef.current === next) return
    zoneRef.current = next
    setZone(next)
  }, [])

  const measure = useCallback(() => {
    const track = trackRef.current
    const characterEl = characterRef.current
    if (!track || !characterEl) return

    const nextMax = Math.max(0, (track.offsetWidth - characterEl.offsetWidth) / 2)
    maxOffsetRef.current = nextMax
    setMaxOffset((prev) => (Math.abs(prev - nextMax) < 0.5 ? prev : nextMax))
  }, [])

  useLayoutEffect(() => {
    measure()

    const observer = new ResizeObserver(measure)
    if (trackRef.current) observer.observe(trackRef.current)
    if (characterRef.current) observer.observe(characterRef.current)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  useEffect(() => {
    if (draggingRef.current) return
    const target = snapX(zoneRef.current, maxOffset)
    if (Math.abs(x.get() - target) < 0.5) return
    animate(x, target, SNAP_SPRING)
  }, [maxOffset, x])

  useEffect(() => {
    const sources = [
      ...ZONES.map((key) => character[key]),
      ...ZONES.map((key) => desktopBackgrounds[key]),
      ...ZONES.map((key) => mobileBackgrounds[key]),
    ]

    sources.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [character, desktopBackgrounds, mobileBackgrounds])

  return (
    <section aria-label="Vita500 - Minigame" className="relative w-full overflow-hidden">
      <div className="relative w-full aspect-[500/1024] md:aspect-[1672/941]">
        <BackgroundLayer
          className="md:hidden"
          assets={mobileBackgrounds}
          zone={zone}
        />
        <BackgroundLayer
          className="hidden md:block"
          assets={desktopBackgrounds}
          zone={zone}
        />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            ref={trackRef}
            className="relative flex h-full w-[90%] items-center justify-center md:w-[58%]"
          >
            <motion.div
              ref={characterRef}
              drag="x"
              dragConstraints={{ left: -maxOffset, right: maxOffset }}
              dragElastic={0.12}
              dragMomentum={false}
              style={{ x }}
              onDragStart={() => {
                draggingRef.current = true
              }}
              onDrag={() => {
                updateZone(zoneFromX(x.get(), maxOffsetRef.current))
              }}
              onDragEnd={() => {
                draggingRef.current = false
                const offset = maxOffsetRef.current
                const nextZone = zoneFromX(x.get(), offset)
                updateZone(nextZone)
                animate(x, snapX(nextZone, offset), SNAP_SPRING)
              }}
              aria-label="Drag character left or right"
              className="pointer-events-auto relative h-auto w-[52%] aspect-[1199/1312] cursor-grab touch-none select-none active:cursor-grabbing md:h-[65.8%] md:w-auto"
            >
              {ZONES.map((key) => (
                <motion.img
                  key={key}
                  src={character[key]}
                  alt=""
                  draggable={false}
                  animate={{
                    opacity: zone === key ? 1 : 0,
                    scale: zone === key ? 1 : 0.97,
                  }}
                  transition={CHAR_CROSSFADE}
                  className="pointer-events-none absolute inset-0 h-full w-full object-contain"
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BackgroundLayer({
  assets,
  zone,
  className,
}: {
  assets: ZoneAssets
  zone: Zone
  className: string
}) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <AnimatePresence initial={false}>
        <motion.img
          key={zone}
          src={assets[zone]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={BG_CROSSFADE}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
    </div>
  )
}

export default CharacterDragScene
