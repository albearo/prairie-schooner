import { motion } from 'framer-motion'
import useIsMobile from '../../hooks/useIsMobile'

const contacts = [
  { icon: '📧', label: 'Email', value: 'invest@prairieschooner.com' },
  { icon: '📞', label: 'Phone', value: '+1 (801) 555-0176' },
  { icon: '🌐', label: 'Web', value: 'www.prairieschooner.com/nyc' },
  { icon: '📍', label: 'Ogden HQ', value: '445 Park Blvd, Ogden UT 84401' },
]

const nextSteps = [
  { step: '01', title: 'Schedule a Call', desc: 'Meet with our founding team and review the full prospectus.' },
  { step: '02', title: 'Visit Ogden', desc: 'Experience the original Prairie Schooner firsthand — we\'ll fly you out.' },
  { step: '03', title: 'Review Term Sheet', desc: 'Flexible equity and debt structures available for the right partners.' },
  { step: '04', title: 'Break Ground', desc: 'Target buildout start: Q4 2026. Opening: Q2 2027.' },
]

export default function Slide09_CTA() {
  const isMobile = useIsMobile()
  return (
    <div className="slide" style={{ gap: '1.5rem', maxWidth: '900px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
      {/* Wagon wheel decoration */}
      <motion.div
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 0.15 }}
        transition={{ opacity: { duration: 1 }, rotate: { duration: 60, repeat: Infinity, ease: 'linear' } }}
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '50vmin',
          height: '50vmin',
          border: '3px solid #c9a84c',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
      >
        <div style={{ fontFamily: 'Rye, serif', color: '#e8740c', fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          The Trail Begins Here
        </div>
        <h2
          className="fire-glow"
          style={{
            fontFamily: 'Rye, serif',
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            color: '#f5e6c8',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          JOIN THE TRAIL
        </h2>
        <p style={{ fontFamily: 'Lato, sans-serif', color: '#c9a84c', fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)', marginTop: '0.5rem', fontStyle: 'italic' }}>
          Invest in the most ambitious themed dining concept of the decade.
        </p>
      </motion.div>

      <div className="divider-fire" style={{ width: 'min(500px, 80vw)', margin: '0 auto' }} />

      {/* Next steps */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '0.6rem', width: '100%' }}
      >
        {nextSteps.map((s) => (
          <motion.div
            key={s.step}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
            className="ps-card"
            style={{ textAlign: 'left' }}
          >
            <div style={{ fontFamily: 'Rye, serif', color: '#e8740c', fontSize: '1.5rem', lineHeight: 1 }}>{s.step}</div>
            <h4 style={{ fontFamily: 'Rye, serif', color: '#c9a84c', fontSize: '0.85rem', margin: '0.3rem 0 0.25rem' }}>{s.title}</h4>
            <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.75)', fontSize: '0.78rem', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}
      >
        {contacts.map(c => (
          <div
            key={c.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(61,31,10,0.5)',
              border: '1px solid rgba(201,168,76,0.35)',
              borderRadius: '4px',
            }}
          >
            <span style={{ fontSize: '1rem' }}>{c.icon}</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.5)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.label}</div>
              <div style={{ fontFamily: 'Lato, sans-serif', color: '#f5e6c8', fontSize: '0.82rem' }}>{c.value}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Closing statement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ paddingBottom: '4rem' }}
      >
        <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.45)', fontSize: '0.78rem', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
          Prairie Schooner NYC, LLC is seeking accredited investors. This presentation contains forward-looking statements and financial projections based on market research and comparable concepts.
          All projections are estimates and not guaranteed. Full investment memorandum available upon execution of NDA.
        </p>
        <p style={{ fontFamily: 'Rye, serif', color: '#c9a84c', fontSize: '1rem', marginTop: '0.75rem' }}>
          Est. 1976 · Ogden, Utah · Next Stop: Times Square
        </p>
        <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(201,168,76,0.3)', fontSize: '0.65rem', marginTop: '0.25rem', letterSpacing: '0.2em' }}>
          PSST: TRY THE KONAMI CODE
        </p>
      </motion.div>
    </div>
  )
}
