import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthProvider'

const ADMIN_EMAIL = 'businessexpense108@gmail.com'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, profile, loading, signOut } = useAuth()

  const isAdmin = user?.email === ADMIN_EMAIL

  function isActive(path: string) {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link to="/" className="site-logo">Gita Gift</Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') || isActive('/verses') || isActive('/verse/') ? 'active' : ''}`}>Verses</Link>
          <Link to="/flashcards" className={`nav-link ${isActive('/flashcards') ? 'active' : ''}`}>Flashcards</Link>
          <Link to="/grammar/conjugations" className={`nav-link ${isActive('/grammar') ? 'active' : ''}`}>Grammar</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
          {isAdmin && (
            <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>Admin</Link>
          )}
        </div>
        <div className="auth-area">
          {loading ? null : user ? (
            <div className="auth-user">
              <span className="auth-avatar">{(profile?.first_name?.[0] ?? user.email?.[0] ?? '?').toUpperCase()}</span>
              <span className="auth-name">{profile?.first_name ?? 'Guest'}</span>
              <button className="auth-signout" onClick={signOut}>Sign Out</button>
            </div>
          ) : (
            <button className="auth-signin" onClick={() => navigate('/login')}>Sign In</button>
          )}
        </div>
      </nav>
    </header>
  )
}
