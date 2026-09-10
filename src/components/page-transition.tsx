import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type PageTransitionProps = {
  children: ReactNode
}

function PageTransition({ children }: PageTransitionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -10, position: 'absolute', insetInline: 0, top: 0 }
      }
      transition={{ duration: reduceMotion ? 0.16 : 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
