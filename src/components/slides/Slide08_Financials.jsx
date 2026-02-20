import { motion } from 'framer-motion'
import useIsMobile from '../../hooks/useIsMobile'

const useOfFunds = [
  { label: 'Buildout & Construction', amount: '$4.2M', pct: 49, color: '#e8740c' },
  { label: 'Custom Wagon Builds & Décor', amount: '$1.4M', pct: 16, color: '#f4a236' },
  { label: 'Kitchen Equipment', amount: '$0.85M', pct: 10, color: '#c9a84c' },
  { label: 'Pre-Opening (Marketing, Staff)', amount: '$0.65M', pct: 8, color: '#a07828' },
  { label: 'Working Capital Reserve', amount: '$1.35M', pct: 16, color: '#8888aa' },
]

const projections = [
  { year: 'Year 1', revenue: '$11.2M', ebitda: '$1.8M', margin: '16%', covers: '280/day avg', color: '#8888aa' },
  { year: 'Year 2', revenue: '$17.5M', ebitda: '$4.2M', margin: '24%', covers: '420/day avg', color: '#c9a84c' },
  { year: 'Year 3', revenue: '$21.8M', ebitda: '$6.4M', margin: '29%', covers: '520/day avg', color: '#e8740c' },
]

const comps = [
  { name: 'Rainforest Cafe (Times Sq)', revenue: '$85M total system', ebitda: '~18%', note: 'Themed, lower food quality' },
  { name: 'Medieval Times (avg unit)', revenue: '$14–22M', ebitda: '~28%', note: 'Event-driven, captive dining' },
  { name: 'Peter Luger (Brooklyn)', revenue: '$45M est.', ebitda: '~30%', note: 'Premium steak, legendary brand' },
]

function FundBar({ pct, color, delay }) {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${pct}%` }}
      transition={{ delay, duration: 0.9, ease: 'easeOut' }}
      style={{ height: '100%', background: color, borderRadius: '2px' }}
    />
  )
}

export default function Slide08_Financials() {
  const isMobile = useIsMobile()
  return (
    <div className="slide" style={{ gap: '0.75rem', maxWidth: '960px', margin: '0 auto', width: '100%', justifyContent: 'flex-start', paddingTop: '1.5rem', paddingBottom: '5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <span style={{ fontFamily: 'Rye, serif', color: '#e8740c', fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>The Numbers</span>
        <h2 style={{ fontFamily: 'Rye, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', color: '#f5e6c8', margin: '0.25rem 0 0', lineHeight: 1.2 }}>
          Investment Ask: <span className="gold-shimmer">$8.5M</span>
        </h2>
        <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.6)', fontSize: '0.8rem', margin: '0.3rem 0 0' }}>
          Targeting breakeven at Month 18 · Full ROI projected Year 3 · Equity offering available
        </p>
      </motion.div>

      <div className="divider-fire" style={{ width: 'min(500px, 80vw)' }} />

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0.8rem', width: '100%' }}>
        {/* Use of funds */}
        <div>
          <h3 style={{ fontFamily: 'Rye, serif', color: '#c9a84c', fontSize: '0.85rem', margin: '0 0 0.5rem', letterSpacing: '0.1em' }}>USE OF FUNDS</h3>
          <div className="ps-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {useOfFunds.map((f, i) => (
              <div key={f.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ fontFamily: 'Lato, sans-serif', color: '#f5e6c8', fontSize: '0.78rem' }}>{f.label}</span>
                  <span style={{ fontFamily: 'Lato, sans-serif', color: f.color, fontSize: '0.78rem', fontWeight: 700 }}>{f.amount}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '2px', height: '6px', overflow: 'hidden' }}>
                  <FundBar pct={f.pct} color={f.color} delay={0.3 + i * 0.1} />
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: '0.4rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Lato, sans-serif', color: '#c9a84c', fontSize: '0.8rem', fontWeight: 700 }}>TOTAL</span>
              <span style={{ fontFamily: 'Rye, serif', color: '#c9a84c', fontSize: '0.9rem' }}>$8.5M</span>
            </div>
          </div>
        </div>

        {/* Revenue projections */}
        <div>
          <h3 style={{ fontFamily: 'Rye, serif', color: '#c9a84c', fontSize: '0.85rem', margin: '0 0 0.5rem', letterSpacing: '0.1em' }}>REVENUE PROJECTIONS</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {projections.map((p, i) => (
              <motion.div
                key={p.year}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="ps-card"
                style={{ padding: '0.6rem 0.8rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'Rye, serif', color: p.color, fontSize: '0.85rem' }}>{p.year}</div>
                    <div style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.55)', fontSize: '0.7rem' }}>{p.covers}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Rye, serif', color: '#f5e6c8', fontSize: '1.1rem' }}>{p.revenue}</div>
                    <div style={{ fontFamily: 'Lato, sans-serif', color: '#3dcc3d', fontSize: '0.72rem' }}>EBITDA {p.ebitda} ({p.margin})</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Comp set */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{ width: '100%', paddingBottom: '4rem' }}
      >
        <h3 style={{ fontFamily: 'Rye, serif', color: '#c9a84c', fontSize: '0.85rem', margin: '0 0 0.4rem', letterSpacing: '0.1em' }}>COMPARABLE SET</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {comps.map(c => (
            <div key={c.name} className="ps-card" style={{ flex: '1', minWidth: '200px', padding: '0.6rem 0.8rem' }}>
              <div style={{ fontFamily: 'Lato, sans-serif', color: '#f4a236', fontSize: '0.78rem', fontWeight: 700 }}>{c.name}</div>
              <div style={{ fontFamily: 'Lato, sans-serif', color: '#c9a84c', fontSize: '0.75rem' }}>Rev: {c.revenue} · EBITDA: {c.ebitda}</div>
              <div style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.5)', fontSize: '0.7rem', marginTop: '0.2rem' }}>{c.note}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
