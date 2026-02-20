import { Link } from 'react-router-dom'
import LotusWatermark from '../components/LotusWatermark'

export default function Home() {
  return (
    <main className="home-page">
      {/* Floating sacred geometry — blurred gold shapes behind title */}
      <div className="sacred-geometry" aria-hidden="true">
        <div className="geo-shape geo-diamond"></div>
        <div className="geo-shape geo-circle"></div>
        <div className="geo-shape geo-ring"></div>
      </div>

      <div className="home-lotus-wrap">
        <LotusWatermark />
      </div>

      <h1>Sanskrit Gita Study</h1>

      {/* Gold hairline divider */}
      <div className="gold-hairline" aria-hidden="true"></div>

      <p className="subtitle">A devotional tool for deep study of sacred Sanskrit verses</p>

      <div className="home-actions">
        <Link to="/verses" className="btn btn-primary">
          Browse All Verses
        </Link>
        <Link to="/verse/18/66" className="btn btn-secondary">
          Study BG 18.66
        </Link>
      </div>
    </main>
  )
}
