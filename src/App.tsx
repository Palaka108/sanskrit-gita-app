import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import AuthProvider, { useAuth } from './lib/AuthProvider'
import FirstNameModal from './components/FirstNameModal'
import Header from './components/Header'
import VerseIndex from './pages/VerseIndex'
import VersePage from './pages/VersePage'
import Dashboard from './pages/Dashboard'
import ConjugationsPage from './pages/ConjugationsPage'
import AdminListens from './pages/AdminListens'
import FlashcardsPage from './pages/FlashcardsPage'
import AboutPage from './pages/AboutPage'
import PrivacyPage from './pages/PrivacyPage'
import LoginPage from './pages/LoginPage'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AppShell() {
  const location = useLocation()
  const hideHeader = location.pathname === '/login'

  return (
    <>
      {!hideHeader && <Header />}
      <FirstNameModal />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/" element={<RequireAuth><VerseIndex /></RequireAuth>} />
        <Route path="/verses" element={<RequireAuth><VerseIndex /></RequireAuth>} />
        <Route path="/verse/:chapter/:verse" element={<RequireAuth><VersePage /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/grammar/conjugations" element={<RequireAuth><ConjugationsPage /></RequireAuth>} />
        <Route path="/admin" element={<RequireAuth><AdminListens /></RequireAuth>} />
        <Route path="/flashcards" element={<RequireAuth><FlashcardsPage /></RequireAuth>} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  )
}
