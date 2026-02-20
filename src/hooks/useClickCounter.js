import { useRef, useCallback } from 'react'

export default function useClickCounter(threshold, callback) {
  const count = useRef(0)
  const timer = useRef(null)

  const handleClick = useCallback(() => {
    count.current += 1
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      count.current = 0
    }, 1200)
    if (count.current >= threshold) {
      count.current = 0
      clearTimeout(timer.current)
      callback()
    }
  }, [threshold, callback])

  return handleClick
}
