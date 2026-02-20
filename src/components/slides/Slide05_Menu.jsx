import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useClickCounter from '../../hooks/useClickCounter'
import useIsMobile from '../../hooks/useIsMobile'

const steaks = [
  {
    name: 'The Wagonmaster Porterhouse',
    cut: '28 oz. Bone-In Porterhouse',
    desc: '21-day dry-aged USDA Prime, hand-cut on-site, finished over mesquite wood coals. Served tableside on a carved oak board.',
    price: '$72',
    badge: 'SIGNATURE',
    badgeColor: '#c9a84c',
    emoji: '🥩',
  },
  {
    name: 'The Trail Boss Ribeye',
    cut: '18 oz. Bone-In Ribeye',
    desc: 'Beautifully marbled Prime cut, 21-day aged, seasoned with our house "Frontier Rub" — smoked paprika, black pepper, and cedar salt.',
    price: '$58',
    badge: null,
    emoji: '🥩',
  },
  {
    name: 'The Cowgirl',
    cut: '10 oz. Filet Mignon',
    desc: 'Center-cut tenderloin, butter-basted in a cast-iron skillet, served with crispy tobacco onions and a roasted bone marrow compound butter.',
    price: '$54',
    badge: 'FAN FAVORITE',
    badgeColor: '#e8740c',
    emoji: '🥩',
  },
  {
    name: 'The Homesteader',
    cut: '14 oz. NY Strip',
    desc: 'Classic hand-cut strip, simply seasoned, oak-fired to your specification. The cowboy\'s choice since 1976.',
    price: '$48',
    badge: null,
    emoji: '🥩',
  },
]

const sides = [
  { name: 'Prairie Cast-Iron Corn', desc: 'Charred sweet corn, jalapeño butter, cotija', price: '$9' },
  { name: 'Campfire Baked Potato', desc: 'Foil-baked, loaded with all trimmings', price: '$8' },
  { name: 'Bunkhouse Biscuits', desc: 'Honey-butter skillet biscuits, served hot', price: '$7' },
  { name: 'Chuckwagon Beans', desc: 'Slow-cooked pinto beans, smoked bacon, brown sugar', price: '$9' },
]

export default function Slide05_Menu() {
  const isMobile = useIsMobile()
  const [moraleShown, setMoraleShown] = useState(false)
  const [moraleVisible, setMoraleVisible] = useState(false)

  const handleSteakClick = useClickCounter(3, () => {
    setMoraleVisible(true)
    setMoraleShown(true)
    setTimeout(() => setMoraleVisible(false), 3000)
  })

  return (
    <div className="slide" style={{ gap: '0.75rem', maxWidth: '960px', margin: '0 auto', width: '100%', justifyContent: 'flex-start', paddingTop: '1.5rem', paddingBottom: '5rem' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', flexShrink: 0 }}
      >
        <span style={{ fontFamily: 'Rye, serif', color: '#e8740c', fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>The Menu</span>
        <h2 style={{ fontFamily: 'Rye, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', color: '#f5e6c8', margin: '0.25rem 0 0', lineHeight: 1.2 }}>
          Prime Beef. Trail Recipes.{' '}
          <span className="gold-shimmer">NYC Prices Worth Every Penny.</span>
        </h2>
        <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.65)', fontSize: '0.85rem', margin: '0.25rem 0 0', fontStyle: 'italic' }}>
          All-inclusive dinner format · Entrée + 2 sides + fresh-baked bread + non-alcoholic beverage
        </p>
      </motion.div>

      <div className="divider-fire" style={{ width: 'min(500px, 80vw)', flexShrink: 0 }} />

      {/* Steak cards */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '0.6rem', width: '100%', flex: 1, alignContent: 'start' }}>
        {steaks.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="ps-card"
            onClick={handleSteakClick}
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            {s.badge && (
              <span style={{
                position: 'absolute', top: '-8px', right: '10px',
                background: s.badgeColor, color: '#080810',
                fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.1em',
                padding: '2px 8px', borderRadius: '2px', fontFamily: 'Lato, sans-serif',
              }}>{s.badge}</span>
            )}
            <div style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>{s.emoji}</div>
            <h4 style={{ fontFamily: 'Rye, serif', color: '#f4a236', fontSize: '0.9rem', margin: '0 0 0.2rem', lineHeight: 1.3 }}>{s.name}</h4>
            <p style={{ fontFamily: 'Lato, sans-serif', color: '#c9a84c', fontSize: '0.75rem', margin: '0 0 0.4rem', fontStyle: 'italic' }}>{s.cut}</p>
            <p style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.8)', fontSize: '0.8rem', margin: '0 0 0.6rem', lineHeight: 1.5 }}>{s.desc}</p>
            <p style={{ fontFamily: 'Rye, serif', color: '#c9a84c', fontSize: '1.1rem', margin: 0 }}>{s.price}</p>
          </motion.div>
        ))}
      </div>

      {/* Sides */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        style={{ width: '100%', flexShrink: 0 }}
      >
        <h4 style={{ fontFamily: 'Rye, serif', color: '#c9a84c', fontSize: '0.9rem', margin: '0 0 0.4rem', textAlign: 'center', letterSpacing: '0.15em' }}>— CHUCKWAGON SIDES —</h4>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '0.4rem' }}>
          {sides.map(s => (
            <div key={s.name} style={{
              background: 'rgba(61,31,10,0.3)', border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '4px', padding: '0.4rem 0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem',
            }}>
              <div style={{ minWidth: 0 }}>
                <span style={{ fontFamily: 'Lato, sans-serif', color: '#f5e6c8', fontSize: '0.8rem', fontWeight: 700 }}>{s.name}</span>
                <span style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,230,200,0.5)', fontSize: '0.75rem', marginLeft: '0.4rem' }}>— {s.desc}</span>
              </div>
              <span style={{ fontFamily: 'Rye, serif', color: '#c9a84c', fontSize: '0.85rem', flexShrink: 0 }}>{s.price}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Morale easter egg */}
      <AnimatePresence>
        {moraleVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            style={{
              position: 'fixed', bottom: '6rem', left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(8,8,16,0.9)', border: '2px solid #c9a84c',
              borderRadius: '8px', padding: '1rem 2rem', zIndex: 99,
              textAlign: 'center', fontFamily: 'Courier New, monospace',
              color: '#33ff33', minWidth: '320px',
            }}
          >
            <p style={{ margin: 0, fontSize: '1rem' }}>Your party ate well tonight.</p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '1.2rem', color: '#ffff33' }}>+1 MORALE 🎉</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
