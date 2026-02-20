import { motion } from 'framer-motion'
import useIsMobile from '../../hooks/useIsMobile'

const stats = [
  { value: '50M+', label: 'Annual Visitors', sub: 'to Times Square alone' },
  { value: '#1', label: 'Tourist Destination', sub: 'in the United States' },
  { value: '480K', label: 'Daily Foot Traffic', sub: 'through Times Square' },
  { value: '89', label: 'Hotels Within 1 Mile', sub: '50,000+ rooms' },
  { value: '41', label: 'Broadway Theaters', sub: 'nearby, captive audience' },
  { value: '$147', label: 'Avg Tourist Spend', sub: 'per dining occasion in NYC' },
]

const targetBlocks = [
  { icon: '🏨', label: 'Hotel Pre-Theater Dining', desc: 'Partner with 20+ Midtown hotels for preferred referral programs. Pre-theater diners represent 35% of Times Square restaurant revenue.' },
  { icon: '🎭', label: 'Broadway Package Deals', desc: '"The Pioneer Package": Prairie Schooner dinner + theater combo sold directly through hotel concierges and booking platforms.' },
  { icon: '🌍', label: 'International Tourism', desc: 'NYC receives 14M international tourists annually. Themed/experiential dining indexes 3× higher with international visitors than domestic.' },
  { icon: '🏢', label: 'Corporate Group Dining', desc: '3,000+ sq ft private event space (The Jail & Courthouse combined) targeting $2M+ in annual corporate bookings.' },
]

export default function Slide06_Location() {
  const isMobile = useIsMobile()
  return (
    <div className="slide" style={{ gap: '0.75rem', maxWidth: '960px', margin: '0 auto', width: '100%', justifyContent: 'flex-start', paddingTop: '1.5rem', paddingBottom: '5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', flexShrink: 0 }}
      >
        <span style={{ fontFamily: 'Rye, serif', color: '#e8740c', fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>The Location</span>
        <h2 style={{ fontFamily: 'Rye, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', color: '#f5e6c8', margin: '0.25rem 0 0', lineHeight: 1.2 }}>
          Times Square, New York City{' '}
          <span className="gold-shimmer">— The Center of the Universe.</span>
        </h2>
      </motion.div>

      <div className="divider-fire" style={{ width: 'min(500px, 80vw)', flexShrink: 0 }} />

      {/* Stats */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '0.6rem', width: '100%', flexShrink: 0 }}
      >
        {stats.map((s) => (
          <motion.div
            key={s.value}
            variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}
            style={{
              background: 'rgba(61,31,10,0.4)',
              border: '1px solid rgba(232,116,12,0.3)',
              borderRadius: '8px',
              padding: '0.75rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'Rye, serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#e8740c', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: 'Lato, sans-serif', color: '#f5e6c8', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.2rem' }}>{s.label}</div>
            <div style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.5)', fontSize: '0.7rem', marginTop: '0.1rem' }}>{s.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Target customers */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '0.6rem', width: '100%', flex: 1, alignContent: 'start' }}>
        {targetBlocks.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            className="ps-card"
            style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}
          >
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{b.icon}</span>
            <div>
              <h4 style={{ fontFamily: 'Rye, serif', color: '#c9a84c', fontSize: '0.85rem', margin: '0 0 0.2rem' }}>{b.label}</h4>
              <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.8)', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 }}>{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Address — in-flow, not absolute */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          width: '100%',
          padding: '0.5rem 1.5rem',
          background: 'rgba(201,168,76,0.1)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: '4px',
          fontFamily: 'Lato, sans-serif', color: '#c9a84c', fontSize: '0.82rem',
          letterSpacing: '0.05em',
          flexShrink: 0,
          textAlign: 'center',
        }}
      >
        📍 Target: 1540–1560 Broadway, Times Square, NY 10036 · ~12,000 sq ft ground floor + basement
      </motion.div>
    </div>
  )
}
