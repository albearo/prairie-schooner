import { useState } from 'react'
import { motion } from 'framer-motion'
import useClickCounter from '../../hooks/useClickCounter'
import DysenteryModal from '../easter-eggs/DysenteryModal'

export default function Slide01_Title() {
  const [showDysentery, setShowDysentery] = useState(false)

  const handleWagonClick = useClickCounter(5, () => setShowDysentery(true))

  return (
    <div className="slide" style={{ textAlign: 'center', gap: '1.5rem' }}>
      {/* Wagon SVG logo — click 5× for easter egg */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring', bounce: 0.4 }}
        onClick={handleWagonClick}
        style={{ cursor: 'pointer', userSelect: 'none' }}
        title="Click 5 times…"
      >
        <WagonSVG />
      </motion.div>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.9, type: 'spring', bounce: 0.3 }}
        className="fire-glow"
        style={{
          fontFamily: 'Rye, serif',
          fontSize: 'clamp(3rem, 9vw, 8rem)',
          color: '#f5e6c8',
          margin: 0,
          lineHeight: 1,
          letterSpacing: '0.04em',
        }}
      >
        PRAIRIE<br />SCHOONER
      </motion.h1>

      {/* Fire divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="divider-fire"
        style={{ width: 'min(600px, 80vw)' }}
      />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        style={{
          fontFamily: 'Lato, sans-serif',
          fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
          color: '#c9a84c',
          margin: 0,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        The Wild West Rides into Times Square
      </motion.p>

      {/* Founded badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        style={{
          marginTop: '0.5rem',
          padding: '0.4rem 1.5rem',
          border: '1px solid rgba(201,168,76,0.4)',
          borderRadius: '999px',
          background: 'rgba(61,31,10,0.4)',
          color: 'rgba(245,230,200,0.65)',
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
          fontFamily: 'Lato, sans-serif',
          textTransform: 'uppercase',
        }}
      >
        Est. 1976 · Ogden, Utah · Investor Presentation 2026
      </motion.div>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 3, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '5rem',
          fontSize: '0.7rem',
          color: '#c9a84c',
          letterSpacing: '0.15em',
          fontFamily: 'Lato, sans-serif',
        }}
      >
        PRESS → TO ADVANCE · SWIPE ON MOBILE
      </motion.p>

      {showDysentery && <DysenteryModal onClose={() => setShowDysentery(false)} />}
    </div>
  )
}

function WagonSVG() {
  return (
    <svg width="140" height="80" viewBox="0 0 140 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Canvas/cover */}
      <ellipse cx="70" cy="28" rx="45" ry="22" fill="rgba(245,230,200,0.15)" stroke="#c9a84c" strokeWidth="1.5" />
      <path d="M25 28 Q70 8 115 28" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
      {/* Body */}
      <rect x="20" y="44" width="100" height="18" rx="3" fill="rgba(61,31,10,0.8)" stroke="#c9a84c" strokeWidth="1.5" />
      {/* Ribs */}
      {[35,50,65,80,95,110].map((x,i) => (
        <line key={i} x1={x} y1="44" x2={x - 8} y2="28" stroke="#c9a84c" strokeWidth="0.8" opacity="0.6" />
      ))}
      {/* Wheels */}
      <circle cx="38" cy="62" r="14" fill="none" stroke="#e8740c" strokeWidth="2.5" />
      <circle cx="38" cy="62" r="4" fill="#e8740c" />
      {[0,45,90,135].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        return <line key={i} x1={38 + Math.cos(rad)*4} y1={62 + Math.sin(rad)*4} x2={38 + Math.cos(rad)*13} y2={62 + Math.sin(rad)*13} stroke="#e8740c" strokeWidth="1.5" />
      })}
      <circle cx="102" cy="62" r="14" fill="none" stroke="#e8740c" strokeWidth="2.5" />
      <circle cx="102" cy="62" r="4" fill="#e8740c" />
      {[0,45,90,135].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        return <line key={i} x1={102 + Math.cos(rad)*4} y1={62 + Math.sin(rad)*4} x2={102 + Math.cos(rad)*13} y2={62 + Math.sin(rad)*13} stroke="#e8740c" strokeWidth="1.5" />
      })}
      {/* Tongue/hitch */}
      <line x1="20" y1="54" x2="2" y2="62" stroke="#c9a84c" strokeWidth="2" />
    </svg>
  )
}
