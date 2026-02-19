import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import VersePage from './pages/VersePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verse/:chapter/:verse" element={<VersePage />} />
      </Routes>
    </BrowserRouter>
  )
}
