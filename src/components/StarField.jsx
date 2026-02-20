import { useMemo } from 'react'

const STAR_COUNT = 200

export default function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: (Math.random() * 4 + 2).toFixed(2),
      delay: (Math.random() * 5).toFixed(2),
      minOpacity: (Math.random() * 0.2 + 0.05).toFixed(2),
      maxOpacity: (Math.random() * 0.6 + 0.3).toFixed(2),
    }))
  }, [])

  return (
    <div className="starfield">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            '--duration': `${s.duration}s`,
            '--delay': `${s.delay}s`,
            '--min-opacity': s.minOpacity,
            '--max-opacity': s.maxOpacity,
          }}
        />
      ))}
    </div>
  )
}
