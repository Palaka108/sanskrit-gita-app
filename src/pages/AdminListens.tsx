import { useEffect, useState } from 'react'
import { useAuth } from '../lib/AuthProvider'
import { supabase } from '../lib/supabaseClient'

const ADMIN_EMAIL = 'businessexpense108@gmail.com'

interface ListenRow {
  id: string
  user_id: string
  chapter: number
  verse: number
  track_type: string
  listened_at: string
}

interface ProfileRow {
  id: string
  first_name: string
  email: string | null
}

interface UserSummary {
  id: string
  first_name: string
  email: string | null
  total: number
  last_active: string
  verses: { chapter: number; verse: number; count: number }[]
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export default function AdminListens() {
  const { user, loading: authLoading } = useAuth()
  const [listens, setListens] = useState<ListenRow[]>([])
  const [profiles, setProfiles] = useState<ProfileRow[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedUser, setExpandedUser] = useState<string | null>(null)

  const isAdmin = user?.email === ADMIN_EMAIL

  useEffect(() => {
    if (!isAdmin) return
    async function load() {
      const [listensRes, profilesRes] = await Promise.all([
        supabase.from('verse_listens').select('*').order('listened_at', { ascending: false }),
        supabase.from('gita_profiles').select('*'),
      ])
      if (listensRes.data) setListens(listensRes.data)
      if (profilesRes.data) setProfiles(profilesRes.data)
      setLoading(false)
    }
    load()
  }, [isAdmin])

  if (authLoading) return <main className="admin-page"><p className="loading">Loading...</p></main>

  if (!user) {
    return (
      <main className="admin-page fade-in">
        <h1>Admin</h1>
        <p className="admin-denied">Please sign in to access this page.</p>
      </main>
    )
  }

  if (!isAdmin) {
    return (
      <main className="admin-page fade-in">
        <h1>Admin</h1>
        <p className="admin-denied">Access denied. Admin only.</p>
      </main>
    )
  }

  if (loading) return <main className="admin-page"><p className="loading">Loading listen data...</p></main>

  // Build per-user summaries
  const profileMap = new Map(profiles.map(p => [p.id, p]))
  const userMap = new Map<string, UserSummary>()

  for (const l of listens) {
    if (!userMap.has(l.user_id)) {
      const p = profileMap.get(l.user_id)
      userMap.set(l.user_id, {
        id: l.user_id,
        first_name: p?.first_name ?? 'Unknown',
        email: p?.email ?? null,
        total: 0,
        last_active: l.listened_at,
        verses: [],
      })
    }
    const u = userMap.get(l.user_id)!
    u.total++
    if (l.listened_at > u.last_active) u.last_active = l.listened_at

    const existing = u.verses.find(v => v.chapter === l.chapter && v.verse === l.verse)
    if (existing) {
      existing.count++
    } else {
      u.verses.push({ chapter: l.chapter, verse: l.verse, count: 1 })
    }
  }

  const userSummaries = Array.from(userMap.values()).sort((a, b) => b.total - a.total)

  // Most popular verse
  const verseCounter = new Map<string, number>()
  for (const l of listens) {
    const key = `${l.chapter}.${l.verse}`
    verseCounter.set(key, (verseCounter.get(key) ?? 0) + 1)
  }
  let topVerse = '—'
  let topVerseCount = 0
  for (const [v, c] of verseCounter) {
    if (c > topVerseCount) { topVerse = v; topVerseCount = c }
  }

  const uniqueListeners = userSummaries.length
  const recentListens = listens.slice(0, 50)

  return (
    <main className="admin-page fade-in">
      <h1>Listen Analytics</h1>

      {/* Overview */}
      <div className="admin-stats">
        <div className="admin-stat glass-card">
          <span className="stat-value">{listens.length}</span>
          <span className="stat-label">Total Listens</span>
        </div>
        <div className="admin-stat glass-card">
          <span className="stat-value">{uniqueListeners}</span>
          <span className="stat-label">Unique Listeners</span>
        </div>
        <div className="admin-stat glass-card">
          <span className="stat-value">BG {topVerse}</span>
          <span className="stat-label">Most Played ({topVerseCount}x)</span>
        </div>
      </div>

      {/* Per-user table */}
      <section className="admin-section">
        <h2>Listeners</h2>
        {userSummaries.length === 0 ? (
          <p className="admin-empty">No listens recorded yet.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Listens</th>
                  <th>Last Active</th>
                </tr>
              </thead>
              <tbody>
                {userSummaries.map(u => (
                  <>
                    <tr
                      key={u.id}
                      className={`admin-row ${expandedUser === u.id ? 'expanded' : ''}`}
                      onClick={() => setExpandedUser(expandedUser === u.id ? null : u.id)}
                    >
                      <td>{u.first_name}</td>
                      <td>{u.email ?? '—'}</td>
                      <td>{u.total}</td>
                      <td>{formatDate(u.last_active)}</td>
                    </tr>
                    {expandedUser === u.id && (
                      <tr key={`${u.id}-detail`} className="admin-detail-row">
                        <td colSpan={4}>
                          <div className="admin-verse-list">
                            {u.verses
                              .sort((a, b) => b.count - a.count)
                              .map(v => (
                                <span key={`${v.chapter}.${v.verse}`} className="admin-verse-chip">
                                  BG {v.chapter}.{v.verse} <strong>{v.count}x</strong>
                                </span>
                              ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Recent activity */}
      <section className="admin-section">
        <h2>Recent Activity</h2>
        {recentListens.length === 0 ? (
          <p className="admin-empty">No activity yet.</p>
        ) : (
          <ul className="admin-activity">
            {recentListens.map(l => {
              const p = profileMap.get(l.user_id)
              return (
                <li key={l.id} className="admin-activity-item">
                  <span className="activity-who">{p?.first_name ?? 'Unknown'}</span>
                  <span className="activity-what">listened to BG {l.chapter}.{l.verse}</span>
                  <span className="activity-type">{l.track_type === 'gita_vibe' ? 'Gita Vibe' : 'Traditional'}</span>
                  <span className="activity-when">{formatDate(l.listened_at)}</span>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </main>
  )
}
