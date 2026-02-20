import { motion } from 'framer-motion'
import useIsMobile from '../../hooks/useIsMobile'

const competitors = [
  { name: 'Rainforest Cafe', revenue: '$85M', coverage: 'Themed, weak food', threat: 'low' },
  { name: 'Medieval Times', revenue: '$120M', coverage: 'Themed, event-driven', threat: 'low' },
  { name: 'Peter Luger', revenue: '$45M', coverage: 'Premium steak, no theme', threat: 'med' },
  { name: 'Smith & Wollensky', revenue: '$38M', coverage: 'Premium steak, no theme', threat: 'med' },
  { name: 'Prairie Schooner NYC', revenue: '$18–22M', coverage: 'Premium steak + full theme', threat: 'us', highlight: true },
]

const marketStats = [
  { label: 'NYC Restaurant Market', value: '$26.5B', sub: 'annual revenue (2025)' },
  { label: 'Themed Dining Global', value: '$11.3B', sub: 'growing 14.2% YoY' },
  { label: 'NYC Tourist Dining', value: '$8.2B', sub: 'annual spend by tourists' },
  { label: 'Experiential Premium', value: '+42%', sub: 'willingness to pay vs. standard dining' },
]

function Bar({ pct, color, delay }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '2px', height: '8px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ delay, duration: 0.8, ease: 'easeOut' }}
        style={{ height: '100%', background: color, borderRadius: '2px' }}
      />
    </div>
  )
}

export default function Slide07_Market() {
  const isMobile = useIsMobile()
  return (
    <div className="slide" style={{ gap: '0.75rem', maxWidth: '960px', margin: '0 auto', width: '100%', justifyContent: 'flex-start', paddingTop: '1.5rem', paddingBottom: '5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <span style={{ fontFamily: 'Rye, serif', color: '#e8740c', fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>The Market</span>
        <h2 style={{ fontFamily: 'Rye, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#f5e6c8', margin: '0.25rem 0 0', lineHeight: 1.2 }}>
          A Billion-Dollar Gap in the<br />
          <span className="gold-shimmer">Most Lucrative Dining Market on Earth</span>
        </h2>
      </motion.div>

      <div className="divider-fire" style={{ width: 'min(500px, 80vw)' }} />

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem', width: '100%', paddingBottom: '4rem' }}>
        {/* Market size stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <h3 style={{ fontFamily: 'Rye, serif', color: '#c9a84c', fontSize: '1rem', margin: 0, letterSpacing: '0.1em' }}>MARKET SIZE</h3>
          {marketStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="ps-card"
              style={{ padding: '0.75rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.7)', fontSize: '0.75rem' }}>{s.label}</div>
                  <div style={{ fontFamily: 'Rye, serif', color: '#f4a236', fontSize: '1.4rem' }}>{s.value}</div>
                  <div style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.5)', fontSize: '0.7rem' }}>{s.sub}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Competitive gap */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <h3 style={{ fontFamily: 'Rye, serif', color: '#c9a84c', fontSize: '1rem', margin: 0, letterSpacing: '0.1em' }}>COMPETITIVE LANDSCAPE</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="ps-card"
            style={{ padding: '0.75rem', flexGrow: 1 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {competitors.map((c, i) => (
                <div key={c.name} style={{
                  padding: '0.4rem 0.6rem',
                  background: c.highlight ? 'rgba(232,116,12,0.15)' : 'transparent',
                  border: c.highlight ? '1px solid rgba(232,116,12,0.5)' : '1px solid transparent',
                  borderRadius: '4px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <span style={{ fontFamily: 'Lato, sans-serif', color: c.highlight ? '#f4a236' : '#f5e6c8', fontSize: '0.8rem', fontWeight: c.highlight ? 700 : 400 }}>
                      {c.highlight ? '⭐ ' : ''}{c.name}
                    </span>
                    <span style={{ fontFamily: 'Lato, sans-serif', color: '#c9a84c', fontSize: '0.8rem' }}>{c.revenue}</span>
                  </div>
                  <div style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.5)', fontSize: '0.7rem', marginBottom: '0.3rem' }}>{c.coverage}</div>
                  <Bar
                    pct={c.highlight ? 75 : c.threat === 'low' ? 90 : 60}
                    color={c.highlight ? '#e8740c' : c.threat === 'low' ? '#3d8f3d' : '#8888cc'}
                    delay={0.5 + i * 0.1}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              padding: '0.6rem 0.8rem',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '4px',
              fontFamily: 'Lato, sans-serif',
              color: '#c9a84c',
              fontSize: '0.78rem',
              lineHeight: 1.5,
            }}
          >
            <strong>Conclusion:</strong> No NYC competitor combines premium steakhouse quality with full-scale themed immersion. Prairie Schooner occupies a category of one.
          </motion.div>
        </div>
      </div>
    </div>
  )
}
