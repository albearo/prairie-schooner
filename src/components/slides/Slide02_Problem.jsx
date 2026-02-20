import { motion } from 'framer-motion'

const problems = [
  {
    icon: '🌆',
    title: 'NYC Has No Immersive Steakhouse',
    body: 'Forty thousand restaurants compete in New York City — yet not one offers a fully immersive, themed Western steakhouse experience. The white space is enormous.',
  },
  {
    icon: '📈',
    title: 'Themed Dining Is Exploding',
    body: 'The global themed entertainment dining market grew 14.2% YoY to $11.3B in 2025. Consumers increasingly pay premium for memorable experiences over commodity meals.',
  },
  {
    icon: '🧳',
    title: 'Tourists Demand Unique Experiences',
    body: '67M tourists visited NYC in 2024. Over 80% cite "unique local experience" as their top dining priority — yet they\'re forced into chain restaurants or generic fine dining.',
  },
  {
    icon: '🥩',
    title: 'Premium Steak Is Underserved in Theme Dining',
    body: 'Existing themed restaurants (Rainforest Cafe, Planet Hollywood) serve mediocre food. Diners want spectacle AND quality. Prairie Schooner delivers both: 21-day aged cuts in a cinematic Old West setting.',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function Slide02_Problem() {
  return (
    <div className="slide" style={{ gap: '0.75rem', maxWidth: '900px', margin: '0 auto', width: '100%', justifyContent: 'flex-start', paddingTop: '1.5rem', paddingBottom: '5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <span style={{ fontFamily: 'Rye, serif', color: '#e8740c', fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>The Opportunity</span>
        <h2 style={{ fontFamily: 'Rye, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#f5e6c8', margin: '0.25rem 0 0', lineHeight: 1.2 }}>
          A Gap This Big Is a<br />
          <span className="gold-shimmer">Gold Rush Waiting to Happen</span>
        </h2>
      </motion.div>

      <div className="divider-fire" style={{ width: 'min(500px, 80vw)' }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '0.75rem', width: '100%' }}
      >
        {problems.map((p) => (
          <motion.div
            key={p.title}
            variants={itemVariants}
            className="ps-card"
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <div style={{ fontSize: '2rem' }}>{p.icon}</div>
            <h3 style={{ fontFamily: 'Rye, serif', color: '#f4a236', fontSize: '1rem', margin: 0, lineHeight: 1.3 }}>{p.title}</h3>
            <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.85)', fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>{p.body}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '4.5rem',
          padding: '0.75rem 2rem',
          background: 'linear-gradient(90deg, rgba(232,116,12,0.2), rgba(244,162,54,0.2))',
          border: '1px solid rgba(232,116,12,0.4)',
          borderRadius: '4px',
          textAlign: 'center',
          maxWidth: '700px',
        }}
      >
        <p style={{ fontFamily: 'Lato, sans-serif', color: '#f4a236', fontWeight: 700, fontSize: '1rem', margin: 0 }}>
          Prairie Schooner is the only concept built to fill this gap — with 50 years of proven brand equity from Ogden, Utah.
        </p>
      </motion.div>
    </div>
  )
}
