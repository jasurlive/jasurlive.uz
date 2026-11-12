import { lazy, Suspense } from 'react'
import '@fontsource/press-start-2p/latin-400.css'
import '@fontsource/vt323/latin-400.css'
import '../css/reset.css'
import '../css/theme.css'
import '../css/page.css'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import { previousPage, useRoute } from '../hooks/LOCAL/useRoute'
import { useTheme } from '../hooks/LOCAL/useTheme'

const MatrixRain = lazy(() => import('../components/MatrixRain'))
const Terminal = lazy(() => import('../pages/Terminal'))

// add a page: create it in pages, add it here and an item in shared/Menu.tsx
// everything except Home is split so the first load stays tiny
const pages: Record<string, ReturnType<typeof lazy>> = {
  '/resume': lazy(() => import('../pages/Resume')),
  '/portfolio': lazy(() => import('../pages/Portfolio')),
  '/awards': lazy(() => import('../pages/Awards')),
  '/blogs': lazy(() => import('../pages/Blogs')),
  '/map': lazy(() => import('../pages/Destinero')),
  '/playlist': lazy(() => import('../pages/Playlist')),
  '/settings': lazy(() => import('../pages/Settings')),
}

export default function App() {
  const path = useRoute().replace(/\/+$/, '') || '/'
  const { theme } = useTheme()

  // the terminal floats over the page you came from (kitty-style transparency)
  const terminal = path === '/terminal'
  const pagePath = terminal ? previousPage('/terminal') : path
  const Page = pages[pagePath] ?? Home

  return (
    <>
      <Suspense>{theme === 'matrix' && <MatrixRain />}</Suspense>
      <div inert={terminal} aria-hidden={terminal || undefined}>
        <Layout path={pagePath}>
          <Page />
        </Layout>
      </div>
      {terminal && (
        <Suspense>
          <Terminal />
        </Suspense>
      )}
    </>
  )
}
