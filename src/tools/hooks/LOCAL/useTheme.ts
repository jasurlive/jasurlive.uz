import { useEffect, useState } from 'react'

export const THEMES = ['light', 'dark', 'matrix', 'sega'] as const
export type Theme = (typeof THEMES)[number]

// initial value is set in index.html before paint (no flash)
const getTheme = (): Theme => {
  const t = document.documentElement.dataset.theme as Theme
  return THEMES.includes(t) ? t : 'light'
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem('theme', theme)
}

export function useTheme() {
  const [theme, setState] = useState<Theme>(getTheme)

  // the <html data-theme> attribute is the source of truth (the terminal can change it too)
  useEffect(() => {
    const observer = new MutationObserver(() => setState(getTheme()))
    observer.observe(document.documentElement, { attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const nextTheme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]
  const toggleTheme = () => setTheme(nextTheme)

  return { theme, nextTheme, toggleTheme }
}
