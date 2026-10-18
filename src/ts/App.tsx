import { lazy, Suspense } from 'react'
import '../tools/css/reset.css'
import '../tools/css/page.css'
import Menu from '../tools/shared/Menu'
import Home from '../tools/pages/Home'
import { useRoute } from '../tools/hooks/LOCAL/useRoute'
import { useTheme } from '../tools/hooks/LOCAL/useTheme'

const MatrixRain = lazy(() => import('../tools/components/MatrixRain'))

// split everything except Home so the first load stays tiny
const pages: Record<string, ReturnType<typeof lazy>> = {
  '/resume': lazy(() => import('../tools/pages/Resume')),
  '/portfolio': lazy(() => import('../tools/pages/Portfolio')),
  '/awards': lazy(() => import('../tools/pages/Awards')),
  '/blogs': lazy(() => import('../tools/pages/Blogs')),
  '/terminal': lazy(() => import('../tools/pages/Terminal')),
}

export default function App() {
  const path = useRoute().replace(/\/+$/, '') || '/'
  const Page = pages[path] ?? Home
  const { theme } = useTheme()

  return (
    <div className="with-menu">
      <Suspense>{theme === 'matrix' && <MatrixRain />}</Suspense>
      <Menu />
      <Suspense fallback={<p className="page-status">Loading…</p>}>
        <Page />
      </Suspense>
    </div>
  )
}
