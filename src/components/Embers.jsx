import { useState, useEffect, useCallback } from 'react'

const EMBER_COLORS = ['#e8740c', '#f4a236', '#ffd166', '#ff6b35', '#ffb347']

function createEmber(id) {
  return {
    id,
    x: Math.random() * 100,
    size: Math.random() * 6 + 3,
    color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
    duration: (Math.random() * 3 + 3).toFixed(2),
    delay: (Math.random() * 0.5).toFixed(2),
    drift: `${(Math.random() * 60 - 30).toFixed(0)}px`,
    drift2: `${(Math.random() * 40 - 20).toFixed(0)}px`,
  }
}

export default function Embers() {
  const [embers, setEmbers] = useState(() =>
    Array.from({ length: 15 }, (_, i) => createEmber(i))
  )
  const [nextId, setNextId] = useState(15)

  const spawnEmber = useCallback(() => {
    const id = nextId
    setNextId(n => n + 1)
    const ember = createEmber(id)
    setEmbers(prev => [...prev.slice(-20), ember])

    setTimeout(() => {
      setEmbers(prev => prev.filter(e => e.id !== id))
    }, (parseFloat(ember.duration) + parseFloat(ember.delay) + 0.5) * 1000)
  }, [nextId])

  useEffect(() => {
    const interval = setInterval(spawnEmber, 400)
    return () => clearInterval(interval)
  }, [spawnEmber])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {embers.map(e => (
        <div
          key={e.id}
          className="ember"
          style={{
            left: `${e.x}%`,
            bottom: '0',
            width: `${e.size}px`,
            height: `${e.size}px`,
            background: `radial-gradient(circle, white 0%, ${e.color} 60%, transparent 100%)`,
            '--rise-duration': `${e.duration}s`,
            '--rise-delay': `${e.delay}s`,
            '--drift': e.drift,
            '--drift2': e.drift2,
          }}
        />
      ))}
    </div>
  )
}
