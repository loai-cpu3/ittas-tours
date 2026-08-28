import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AccreditationBar } from './components/layout/AccreditationBar'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HomePage } from './pages/HomePage'
import { PackagePage } from './pages/PackagePage'
import { FamilyPlannerPage } from './pages/FamilyPlannerPage'
import { NotFoundPage } from './pages/NotFoundPage'

/** Restores scroll on route change and honours in-page hash targets. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Let the target render before scrolling to it.
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}

export function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <AccreditationBar />
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/package/:slug" element={<PackagePage />} />
          <Route path="/family-planner" element={<FamilyPlannerPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
