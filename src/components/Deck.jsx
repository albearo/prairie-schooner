import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navigation from './Navigation'

import Slide01_Title from './slides/Slide01_Title'
import Slide02_Problem from './slides/Slide02_Problem'
import Slide03_Concept from './slides/Slide03_Concept'
import Slide04_Experience from './slides/Slide04_Experience'
import Slide05_Menu from './slides/Slide05_Menu'
import Slide06_Location from './slides/Slide06_Location'
import Slide07_Market from './slides/Slide07_Market'
import Slide08_Financials from './slides/Slide08_Financials'
import Slide09_CTA from './slides/Slide09_CTA'

const SLIDES = [
  Slide01_Title,
  Slide02_Problem,
  Slide03_Concept,
  Slide04_Experience,
  Slide05_Menu,
  Slide06_Location,
  Slide07_Market,
  Slide08_Financials,
  Slide09_CTA,
]

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
}

export default function Deck() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const touchStartX = useRef(null)

  const goTo = useCallback((idx) => {
    if (idx < 0 || idx >= SLIDES.length) return
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }, [current])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(current - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [current, goTo])

  // Touch / swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      goTo(current + (dx < 0 ? 1 : -1))
    }
    touchStartX.current = null
  }

  const SlideComponent = SLIDES[current]

  return (
    <div
      style={{ position: 'relative', width: '100vw', height: '100vh', zIndex: 2 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'tween', ease: [0.77, 0, 0.175, 1], duration: 0.55 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <SlideComponent goTo={goTo} />
        </motion.div>
      </AnimatePresence>

      <Navigation current={current} total={SLIDES.length} onGo={goTo} />
    </div>
  )
}
