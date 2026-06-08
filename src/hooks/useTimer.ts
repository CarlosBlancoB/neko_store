import { useCallback, useEffect, useState } from 'react'

export function useTimer(initialSeconds: number): {
  timeLeft: number
  display: string
  isExpired: boolean
  reset: () => void
} {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)

  useEffect(() => {
    if (timeLeft <= 0) return
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timeLeft])

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60

  const display =
    timeLeft > 0
      ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      : 'EXPIRADO'

  const reset = useCallback(() => {
    setTimeLeft(initialSeconds)
  }, [initialSeconds])

  return { timeLeft, display, isExpired: timeLeft <= 0, reset }
}
