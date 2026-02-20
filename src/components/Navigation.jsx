import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const TOTAL = 9

export default function Navigation({ current, total = TOTAL, onGo }) {
  const isMobile = useIsMobile()
  return (
    <div
      style={{
        position: 'fixed',
        bottom: isMobile ? '1rem' : '2rem',
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? '0.5rem' : '1rem',
        pointerEvents: 'none',
      }}
    >
      {/* Prev arrow */}
      <button
        onClick={() => onGo(current - 1)}
        disabled={current === 0}
        style={{
          pointerEvents: 'all',
          background: 'rgba(61,31,10,0.7)',
          border: '1px solid rgba(201,168,76,0.5)',
          borderRadius: '50%',
          width: '2.5rem',
          height: '2.5rem',
          color: current === 0 ? 'rgba(201,168,76,0.3)' : '#c9a84c',
          cursor: current === 0 ? 'not-allowed' : 'pointer',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
        }}
        aria-label="Previous slide"
      >
        ‹
      </button>

      {/* Dots */}
      <div style={{ display: 'flex', gap: isMobile ? '0.4rem' : '0.5rem', pointerEvents: 'all' }}>
        {Array.from({ length: total }, (_, i) => (
          <motion.button
            key={i}
            onClick={() => onGo(i)}
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? (isMobile ? '1.2rem' : '1.5rem') : (isMobile ? '0.6rem' : '0.5rem'),
              height: isMobile ? '0.6rem' : '0.5rem',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              background: i === current
                ? 'linear-gradient(90deg, #e8740c, #f4a236)'
                : 'rgba(201,168,76,0.35)',
              padding: 0,
              transition: 'all 0.3s ease',
              /* bigger tap target on mobile */
              touchAction: 'manipulation',
            }}
          />
        ))}
      </div>

      {/* Next arrow */}
      <button
        onClick={() => onGo(current + 1)}
        disabled={current === total - 1}
        style={{
          pointerEvents: 'all',
          background: 'rgba(61,31,10,0.7)',
          border: '1px solid rgba(201,168,76,0.5)',
          borderRadius: '50%',
          width: '2.5rem',
          height: '2.5rem',
          color: current === total - 1 ? 'rgba(201,168,76,0.3)' : '#c9a84c',
          cursor: current === total - 1 ? 'not-allowed' : 'pointer',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
        }}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Slide counter — hidden on mobile */}
      <span
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          color: 'rgba(201,168,76,0.6)',
          fontSize: '0.75rem',
          fontFamily: 'Lato, sans-serif',
          letterSpacing: '0.1em',
          pointerEvents: 'none',
          display: isMobile ? 'none' : 'block',
        }}
      >
        {current + 1} / {total}
      </span>
    </div>
  )
}
