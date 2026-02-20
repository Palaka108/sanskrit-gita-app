import { Link } from 'react-router-dom'
import DevanagariTrainer from '../components/DevanagariTrainer'
import GrammarIntroSection from '../components/GrammarIntroSection'

export default function Dashboard() {
  return (
    <main className="dashboard-page fade-in">
      <h1>Learning Dashboard</h1>
      <p className="dashboard-subtitle">Practice tools for mastering Sanskrit</p>

      {/* Devanagari Trainer */}
      <div className="dashboard-section glass-card">
        <DevanagariTrainer />
      </div>

      {/* Quick links */}
      <div className="dashboard-links">
        <Link to="/grammar/conjugations" className="dashboard-link-card glass-card">
          <h3>Conjugation Explorer</h3>
          <p>Noun declensions and verb conjugations with beginner-friendly explanations</p>
        </Link>

        <Link to="/grammar/conjugations" className="dashboard-link-card glass-card">
          <h3>Root Explorer</h3>
          <p>Discover Sanskrit verb roots (dhatu) and their transformations</p>
        </Link>
      </div>

      {/* Grammar primer (same accordion as verse page) */}
      <div className="dashboard-section">
        <GrammarIntroSection />
      </div>
    </main>
  )
}
