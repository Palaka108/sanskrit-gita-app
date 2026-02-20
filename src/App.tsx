import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import VerseIndex from './pages/VerseIndex'
import VersePage from './pages/VersePage'
import Dashboard from './pages/Dashboard'
import ConjugationsPage from './pages/ConjugationsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verses" element={<VerseIndex />} />
        <Route path="/verse/:chapter/:verse" element={<VersePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/grammar/conjugations" element={<ConjugationsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
