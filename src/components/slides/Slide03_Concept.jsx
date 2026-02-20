import { motion } from 'framer-motion'

const pillars = [
  { icon: '🛖', label: 'Wagon Booths', desc: 'Guests dine inside authentic-replica covered wagon booths arranged in a circle — each a private world unto itself.' },
  { icon: '🌌', label: 'Starry Sky Ceiling', desc: 'A hand-painted 4,000 sq ft ceiling depicting the Milky Way over the Utah desert, lit by fiber optic stars.' },
  { icon: '🔥', label: 'Campfires & Lanterns', desc: 'Central communal firepit, gas-log campfires at every table cluster, and authentic period oil-lamp lanterns.' },
  { icon: '🦌', label: 'Old West Taxidermy', desc: 'Museum-quality mounts: elk, bison, longhorn steer, and a grizzly bear — all ethically sourced antiques.' },
  { icon: '🏛️', label: 'Western Storefronts', desc: 'Full-scale interior facades: The Courthouse, The Jail, The Gunsmith, and the General Store line the walls.' },
  { icon: '🎵', label: 'Live Entertainment', desc: 'Nightly acoustic cowboy music, periodic "sheriff" walk-arounds, and a mechanical bull for the bold.' },
]

export default function Slide03_Concept() {
  return (
    <div className="slide" style={{ gap: '0.75rem', maxWidth: '960px', margin: '0 auto', width: '100%', justifyContent: 'flex-start', paddingTop: '1.5rem', paddingBottom: '5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <span style={{ fontFamily: 'Rye, serif', color: '#e8740c', fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>The Concept</span>
        <h2 style={{ fontFamily: 'Rye, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#f5e6c8', margin: '0.25rem 0 0', lineHeight: 1.2 }}>
          What Is Prairie Schooner?
        </h2>
      </motion.div>

      <div className="divider-fire" style={{ width: 'min(500px, 80vw)' }} />

      {/* Origin story */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="ps-card"
        style={{ width: '100%', textAlign: 'center', padding: '1rem 2rem' }}
      >
        <p style={{ fontFamily: 'Lato, sans-serif', color: '#f5e6c8', fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', margin: 0, lineHeight: 1.8 }}>
          Founded in <strong style={{ color: '#c9a84c' }}>1976 in Ogden, Utah</strong>, Prairie Schooner has captivated diners for
          nearly five decades with its singular promise: <em style={{ color: '#f4a236' }}>step through our doors and you step into the American West</em>.
          The restaurant has become a Utah institution — beloved by locals, sought out by tourists, and celebrated in regional food media as the gold standard of immersive dining.
          Now, we bring that magic to <strong style={{ color: '#c9a84c' }}>the most visited square mile on Earth</strong>.
        </p>
      </motion.div>

      {/* Pillars grid */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
          gap: '0.75rem',
          width: '100%',
          paddingBottom: '4rem',
        }}
      >
        {pillars.map((p) => (
          <motion.div
            key={p.label}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
            className="ps-card"
            style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}
          >
            <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{p.icon}</span>
            <div>
              <h4 style={{ fontFamily: 'Rye, serif', color: '#f4a236', fontSize: '0.9rem', margin: '0 0 0.25rem' }}>{p.label}</h4>
              <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.8)', fontSize: '0.82rem', margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
