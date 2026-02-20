import { useEffect, useRef } from 'react'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export default function useKonamiCode(callback) {
  const sequence = useRef([])

  useEffect(() => {
    const handler = (e) => {
      sequence.current.push(e.key)
      if (sequence.current.length > KONAMI.length) {
        sequence.current.shift()
      }
      if (sequence.current.join(',') === KONAMI.join(',')) {
        sequence.current = []
        callback()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [callback])
}
