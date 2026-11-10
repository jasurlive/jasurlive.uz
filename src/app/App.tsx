import { lazy, Suspense } from 'react'
import '@fontsource/press-start-2p/latin-400.css'
import '@fontsource/vt323/latin-400.css'
import '../tools/css/reset.css'
import '../tools/css/theme.css'
import '../tools/css/page.css'
import Layout from '../tools/components/Layout'
import Home from '../tools/pages/Home'
import { previousPage, useRoute } from '../tools/hooks/LOCAL/useRoute'
import { useTheme } from '../tools/hooks/LOCAL/useTheme'

const MatrixRain = lazy(() => import('../tools/components/MatrixRain'))
const Terminal = lazy(() => import('../tools/pages/Terminal'))

// add a page: create it in tools/pages, add it here and an item in shared/Menu.tsx
// everything except Home is split so the first load stays tiny
const pages: Record<string, ReturnType<typeof lazy>> = {
  '/resume': lazy(() => import('../tools/pages/Resume')),
  '/portfolio': lazy(() => import('../tools/pages/Portfolio')),
  '/awards': lazy(() => import('../tools/pages/Awards')),
  '/blogs': lazy(() => import('../tools/pages/Blogs')),
  '/map': lazy(() => import('../tools/pages/Destinero')),
  '/playlist': lazy(() => import('../tools/pages/Playlist')),
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
