// theme registry: light + dark are always on, the rest are "extra" themes
// set VITE_ENABLE_EXTRA_THEMES=false in .env to turn the extras off
// (colors live in css/theme.css; index.html sets the saved one before paint)

export const BASE_THEMES = ['light', 'dark'] as const
export const EXTRA_THEMES = ['linen', 'fjord', 'moss', 'charcoal', 'matrix', 'sega'] as const

export type Theme = (typeof BASE_THEMES)[number] | (typeof EXTRA_THEMES)[number]

export const THEME_LABELS: Record<Theme, string> = {
  light: 'Light',
  dark: 'Dark',
  linen: 'Linen',
  fjord: 'Fjord',
  moss: 'Moss',
  charcoal: 'Charcoal',
  matrix: 'Matrix',
  sega: 'Sega',
}

export const EXTRA_THEMES_ENABLED = import.meta.env.VITE_ENABLE_EXTRA_THEMES !== 'false'

export const THEMES: readonly Theme[] = EXTRA_THEMES_ENABLED
  ? [...BASE_THEMES, ...EXTRA_THEMES]
  : BASE_THEMES

export const isTheme = (value: unknown): value is Theme => THEMES.includes(value as Theme)
