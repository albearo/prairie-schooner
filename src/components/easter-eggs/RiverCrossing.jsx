import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const OUTCOMES = {
  ford: [
    { text: 'You attempt to ford the river...', delay: 0 },
    { text: 'The current is too strong!', delay: 900 },
    { text: 'You lose 2 oxen and 50 lbs of food.', delay: 1800 },
    { text: 'But you made it across.', delay: 2700, good: true },
  ],
  wait: [
    { text: 'You wait for the river to recede...', delay: 0 },
    { text: 'Three days pass.', delay: 900 },
    { text: 'The river is still deep.', delay: 1800 },
    { text: 'But the group is well-rested. +2 morale.', delay: 2700, good: true },
  ],
  ferry: [
    { text: 'You hire the ferry service...', delay: 0 },
    { text: 'The ferryman charges $5.00.', delay: 900 },
    { text: 'Your supplies are safe.', delay: 1800 },
    { text: 'You cross in comfort. +1 morale.', delay: 2700, good: true },
  ],
}

export default function RiverCrossing({ onClose }) {
  const [chosen, setChosen] = useState(null)
  const [visibleLines, setVisibleLines] = useState([])

  const choose = (opt) => {
    setChosen(opt)
    const lines = OUTCOMES[opt]
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
      }, line.delay)
    })
    setTimeout(onClose, 4500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.9)',
      }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.3 }}
        style={{
          background: '#050f05',
          border: '2px solid #1a4f1a',
          borderRadius: '4px',
          padding: '2rem',
          maxWidth: '480px',
          width: '90vw',
          fontFamily: 'Courier New, monospace',
          color: '#33ff33',
        }}
      >
        <div style={{ fontSize: '0.7rem', color: '#1a8f1a', marginBottom: '1rem', letterSpacing: '0.1em' }}>
          PRAIRIE SCHOONER TRAIL — 1843
        </div>

        <div style={{ fontSize: '1rem', color: '#33ff33', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.5rem' }}>🌊 You have reached the river crossing.</p>
          <p style={{ margin: '0 0 0.5rem', color: '#ffff33' }}>THE RIVER IS TOO DEEP TO FORD.</p>
          <p style={{ margin: 0, color: '#aaffaa' }}>The water is 4.2 feet deep. Your wagon wheels are 3 feet high.</p>
        </div>

        {!chosen ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ color: '#aaffaa', fontSize: '0.85rem', marginBottom: '0.25rem' }}>What do you do?</div>
            {[
              { id: 'ford', label: 'Attempt to ford the river', risk: 'HIGH RISK' },
              { id: 'wait', label: 'Wait for conditions to improve', risk: 'LOW RISK' },
              { id: 'ferry', label: 'Take the ferry ($5.00)', risk: 'SAFE' },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => choose(opt.id)}
                style={{
                  background: 'transparent',
                  border: '1px solid #1a8f1a',
                  color: '#33ff33',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '0.85rem',
                  textAlign: 'left',
                  borderRadius: '2px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(51,255,51,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span>▶ {opt.label}</span>
                <span style={{ color: opt.risk === 'HIGH RISK' ? '#ff4444' : opt.risk === 'LOW RISK' ? '#ffff33' : '#44ff44', fontSize: '0.7rem' }}>
                  [{opt.risk}]
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ minHeight: '120px' }}>
            {visibleLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  margin: '0 0 0.4rem',
                  color: line.good ? '#44ff44' : '#33ff33',
                  fontSize: '0.9rem',
                }}
              >
                {line.text}
              </motion.p>
            ))}
          </div>
        )}

        <div style={{ marginTop: '1rem', borderTop: '1px solid #1a4f1a', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#0d6e0d', fontSize: '0.7rem' }}>Click anywhere to dismiss</span>
          <button
            onClick={onClose}
            style={{
              background: 'transparent', border: '1px solid #1a4f1a',
              color: '#1a8f1a', padding: '0.25rem 0.75rem',
              cursor: 'pointer', fontFamily: 'Courier New, monospace', fontSize: '0.75rem', borderRadius: '2px',
            }}
          >
            [ESC] CLOSE
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
