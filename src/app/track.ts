// pings /api/visit once per browser session; open the site with ?notrack once to silence your own visits
export function trackVisit() {
    if (import.meta.env.DEV) return
    try {
      if (new URLSearchParams(location.search).has('notrack')) localStorage.setItem('notrack', '1')
      if (localStorage.getItem('notrack') || sessionStorage.getItem('visited')) return
      sessionStorage.setItem('visited', '1')
    } catch {}
  
    fetch('/api/visit', {
      method: 'POST',
      keepalive: true,
      body: JSON.stringify({
        path: location.pathname,
        referrer: document.referrer,
        screen: `${screen.width}×${screen.height}`,
        lang: navigator.language,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    }).catch(() => {})
  }