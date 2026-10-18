import { useSyncExternalStore } from 'react'

// tiny history router: no react-router needed
const subscribe = (cb: () => void) => {
  window.addEventListener('popstate', cb)
  return () => window.removeEventListener('popstate', cb)
}

export function navigate(path: string) {
  if (path === location.pathname) return
  history.pushState(null, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

export function useRoute() {
  return useSyncExternalStore(subscribe, () => location.pathname)
}
