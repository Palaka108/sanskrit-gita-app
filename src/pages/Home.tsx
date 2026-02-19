import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="home-page">
      <h1>Sanskrit Gita Study</h1>
      <p className="subtitle">A devotional tool for deep study of the Bhagavad-gita</p>
      <Link to="/verse/18/66" className="btn btn-primary">
        Study BG 18.66
      </Link>
    </main>
  )
}
