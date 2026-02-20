import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import VerseIndex from './pages/VerseIndex'
import VersePage from './pages/VersePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verses" element={<VerseIndex />} />
        <Route path="/verse/:chapter/:verse" element={<VersePage />} />
      </Routes>
    </BrowserRouter>
  )
}
