import { useCallback } from 'react'
import { useUIStore } from '@/stores/uiStore'

export function useTheme() {
  const isDark = useUIStore((s) => s.isDark)
  const toggleTheme = useUIStore((s) => s.toggleTheme)
  const setTheme = useUIStore((s) => s.setTheme)

  const enableDark = useCallback(() => setTheme(true), [setTheme])
  const enableLight = useCallback(() => setTheme(false), [setTheme])

  return { isDark, toggleTheme, enableDark, enableLight }
}
