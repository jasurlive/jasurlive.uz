import { useSyncExternalStore } from 'react'

// tiny history router: no react-router needed
// also remembers the page you came from (the terminal draws it behind itself)
let current = location.pathname
let previous = '/'

const track = () => {
  if (location.pathname === current) return
  previous = current
  current = location.pathname
}

const subscribe = (cb: () => void) => {
  window.addEventListener('popstate', cb)
  return () => window.removeEventListener('popstate', cb)
}

window.addEventListener('popstate', track)

export function navigate(path: string) {
  if (path === location.pathname) return
  history.pushState(null, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

export function useRoute() {
  return useSyncExternalStore(subscribe, () => location.pathname)
}

// last page that isn't the given one (falls back to home)
export const previousPage = (not: string) => {
  const p = previous.replace(/\/+$/, '') || '/'
  return p === not ? '/' : p
}
