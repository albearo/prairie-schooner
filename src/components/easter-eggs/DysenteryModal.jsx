import { motion } from 'framer-motion'

export default function DysenteryModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.88)',
        cursor: 'pointer',
      }}
    >
      <motion.div
        initial={{ scale: 0.4, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0a0a0a',
          border: '3px solid #555',
          borderRadius: '4px',
          padding: '2rem 3rem',
          textAlign: 'center',
          maxWidth: '420px',
          fontFamily: 'Courier New, monospace',
          position: 'relative',
        }}
      >
        {/* Tombstone shape */}
        <div style={{
          position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)',
          width: '80px', height: '60px',
          background: '#222',
          border: '3px solid #555',
          borderRadius: '40px 40px 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}>
          RIP
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⚰️</div>
          <h2 style={{ color: '#ccc', fontSize: '1.4rem', margin: '0 0 0.5rem', fontFamily: 'Courier New, monospace', lineHeight: 1.3 }}>
            HERE LIES<br />
            <span style={{ color: '#888', fontSize: '1rem' }}>THE WAGON DRIVER</span>
          </h2>
          <div style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.8, margin: '1rem 0' }}>
            <p style={{ margin: '0 0 0.5rem', color: '#e8740c' }}>YOU HAVE DIED OF DYSENTERY</p>
            <p style={{ margin: 0, color: '#888' }}>1842 — 1843</p>
            <p style={{ margin: '0.25rem 0 0', color: '#666', fontSize: '0.8rem', fontStyle: 'italic' }}>
              "He clicked the wagon five times<br />and paid the price."
            </p>
          </div>

          <div style={{ borderTop: '1px solid #333', paddingTop: '1rem', marginTop: '1rem' }}>
            <p style={{ color: '#555', fontSize: '0.75rem', margin: '0 0 0.75rem' }}>
              Your party has lost 1 member. Morale is low.
            </p>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: '1px solid #555',
                color: '#ccc',
                padding: '0.4rem 1.2rem',
                cursor: 'pointer',
                fontFamily: 'Courier New, monospace',
                fontSize: '0.8rem',
                borderRadius: '2px',
                letterSpacing: '0.1em',
              }}
            >
              CONTINUE ON THE TRAIL
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
