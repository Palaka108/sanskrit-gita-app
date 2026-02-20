import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  function isActive(path: string) {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link to="/" className="site-logo">Sanskrit Gita</Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/verses" className={`nav-link ${isActive('/verses') || isActive('/verse/') ? 'active' : ''}`}>Verses</Link>
          <Link to="/grammar/conjugations" className={`nav-link ${isActive('/grammar') ? 'active' : ''}`}>Grammar</Link>
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
        </div>
      </nav>
    </header>
  )
}
