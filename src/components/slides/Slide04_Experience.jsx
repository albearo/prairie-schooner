import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useClickCounter from '../../hooks/useClickCounter'
import useIsMobile from '../../hooks/useIsMobile'
import RiverCrossing from '../easter-eggs/RiverCrossing'

export default function Slide04_Experience() {
  const isMobile = useIsMobile()
  const [showRiver, setShowRiver] = useState(false)
  const [bearAttacked, setBearAttacked] = useState(false)
  const [morale, setMorale] = useState(null)

  const handleCampfireClick = useClickCounter(3, () => setShowRiver(true))
  const handleBearClick = () => {
    setBearAttacked(true)
    setTimeout(() => setBearAttacked(false), 2500)
  }

  return (
    <div className="slide" style={{ gap: '0.75rem', maxWidth: '960px', margin: '0 auto', width: '100%', justifyContent: 'flex-start', paddingTop: '1.5rem', paddingBottom: '5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', flexShrink: 0 }}
      >
        <span style={{ fontFamily: 'Rye, serif', color: '#e8740c', fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>The Experience</span>
        <h2 style={{ fontFamily: 'Rye, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', color: '#f5e6c8', margin: '0.25rem 0 0', lineHeight: 1.2 }}>
          You're Not Just Eating.{' '}
          <span className="gold-shimmer">You're Riding the Trail.</span>
        </h2>
      </motion.div>

      <div className="divider-fire" style={{ width: 'min(500px, 80vw)', flexShrink: 0 }} />

      {/* Main experience grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: '0.6rem',
        width: '100%',
        flex: 1,
        alignContent: 'start',
      }}>
        {/* Wagon booths — full width row 1 */}
        <ExperienceCard
          delay={0.1}
          style={{ gridColumn: '1 / -1' }}
          icon="🛖"
          title="Covered Wagon Booths"
          accent="#c9a84c"
        >
          Eight full-size covered wagon replicas form a circle around a central firepit. Each wagon seats up to 8, with canvas walls, lantern lighting, and a hand-painted interior mural of the Utah desert. Entering your wagon is a <em>moment</em> — a threshold between Manhattan and the frontier.
        </ExperienceCard>

        {/* Starry ceiling — row 2, col 1 */}
        <ExperienceCard delay={0.2} icon="🌌" title="The Night Sky Ceiling" accent="#8888ff">
          A 4,000 sq ft hand-painted vault depicting the Milky Way. 2,400 fiber-optic stars embedded in plaster "shoot" on a random timer. The effect stops conversations.
        </ExperienceCard>

        {/* Campfire — row 2, col 2 — 3× click easter egg */}
        <ExperienceCard
          delay={0.3}
          icon="🔥"
          title="Campfires"
          accent="#e8740c"
          onClick={handleCampfireClick}
          hint="Click 3×"
          style={{ cursor: 'pointer' }}
        >
          Real gas-log flames at every table cluster, plus a grand central communal firepit. The smell of woodsmoke is engineered into the HVAC — a scent-memory that guests don't forget.
        </ExperienceCard>

        {/* Bear — row 2, col 3 — jumpscare */}
        <ExperienceCard
          delay={0.4}
          icon="🐻"
          title="Trophy Taxidermy"
          accent="#a07828"
          onClick={handleBearClick}
          hint="Click the bear"
          style={{ cursor: 'pointer' }}
        >
          Museum-quality antique mounts: Rocky Mountain elk, American bison, longhorn steer, and <strong style={{ color: '#f4a236' }}>Big Earl</strong> — a 900-lb grizzly bear mount that looms over the entrance hall.
        </ExperienceCard>

        {/* Storefronts — full width row 3 */}
        <ExperienceCard delay={0.5} style={{ gridColumn: '1 / -1' }} icon="🏛️" title="Old West Storefronts" accent="#c9a84c">
          Full-scale interior facades ring the dining room: The Courthouse & Sheriff's Office, The Jail (private dining for up to 12), The Gunsmith, and the General Store gift shop. Waiting guests explore like a theme park.
        </ExperienceCard>
      </div>

      {/* Bear jumpscare overlay */}
      <AnimatePresence>
        {bearAttacked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.85)',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div className="bear-attack" style={{ fontSize: '12rem', lineHeight: 1 }}>🐻</div>
            <p style={{ fontFamily: 'Rye, serif', color: '#e8740c', fontSize: '2rem', textAlign: 'center' }}>
              BIG EARL ATTACKS!
            </p>
            <p style={{ fontFamily: 'Lato, sans-serif', color: '#f5e6c8', fontSize: '1rem' }}>
              You have been mauled. Fortunately, Big Earl is stuffed.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {showRiver && <RiverCrossing onClose={() => setShowRiver(false)} />}
    </div>
  )
}

function ExperienceCard({ children, delay = 0, icon, title, accent, onClick, hint, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="ps-card"
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {hint && (
        <span style={{
          position: 'absolute', top: '0.5rem', right: '0.5rem',
          fontSize: '0.6rem', color: 'rgba(201,168,76,0.4)',
          fontFamily: 'Lato, sans-serif', letterSpacing: '0.1em',
        }}>{hint}</span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.4rem' }}>{icon}</span>
        <h4 style={{ fontFamily: 'Rye, serif', color: accent, fontSize: '0.95rem', margin: 0 }}>{title}</h4>
      </div>
      <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.82)', fontSize: 'clamp(0.75rem, 2vw, 0.83rem)', margin: 0, lineHeight: 1.55 }}>
        {children}
      </p>
    </motion.div>
  )
}
