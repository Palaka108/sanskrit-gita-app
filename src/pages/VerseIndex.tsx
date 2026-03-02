import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import type { Verse } from '../types/verse'

type FilterMode = 'all' | 'gita' | 'noi'


function verseLabel(v: Verse): string {
  if (v.source_text === 'noi') return `NOI ${v.verse}`
  return `BG ${v.chapter}.${v.verse}`
}

function verseSortKey(v: Verse): number {
  if (v.source_text === 'noi') return 100 + v.verse
  return v.chapter * 100 + v.verse
}

export default function VerseIndex() {
  const [verses, setVerses] = useState<Verse[]>([])
  const [loading, setLoading] = useState(true)
  const [textFilter, setTextFilter] = useState<FilterMode>('all')
  const [chapterFilter, setChapterFilter] = useState<string>('')

  // Auto-play BG 18.66
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)

  useEffect(() => {
    async function fetchVerses() {
      const { data } = await supabase.from('verses').select('*')
      if (data) {
        const sorted = data.sort((a: Verse, b: Verse) => verseSortKey(a) - verseSortKey(b))
        setVerses(sorted)
      }
      setLoading(false)
    }
    fetchVerses()
  }, [])

  // Auto-play 18.66 on mount
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 1
    audio.play()
      .then(() => {
        setIsPlaying(true)
        setAutoplayBlocked(false)
      })
      .catch(() => setAutoplayBlocked(true))
  }, [])

  // If autoplay blocked, play on first user click anywhere on the page
  useEffect(() => {
    if (!autoplayBlocked) return
    function playOnClick() {
      const audio = audioRef.current
      if (!audio) return
      audio.play()
        .then(() => {
          setIsPlaying(true)
          setAutoplayBlocked(false)
        })
        .catch(() => {})
      document.removeEventListener('click', playOnClick)
    }
    document.addEventListener('click', playOnClick, { once: true })
    return () => document.removeEventListener('click', playOnClick)
  }, [autoplayBlocked])

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true)
          setAutoplayBlocked(false)
        })
        .catch(() => {})
    }
  }

  function handleEnded() {
    setIsPlaying(false)
  }

  const filtered = verses.filter((v) => {
    if (textFilter === 'gita' && v.source_text !== 'gita') return false
    if (textFilter === 'noi' && v.source_text !== 'noi') return false
    if (chapterFilter && v.source_text === 'gita' && v.chapter !== Number(chapterFilter)) return false
    return true
  })

  const gitaChapters = [...new Set(
    verses.filter((v) => v.source_text === 'gita').map((v) => v.chapter)
  )].sort((a, b) => a - b)

  return (
    <main className="verse-index-page">
      {/* Autoplay-blocked overlay — tap anywhere to start */}
      {autoplayBlocked && !isPlaying && (
        <div className="autoplay-overlay" onClick={togglePlay}>
          <div className="autoplay-prompt">
            <span className="autoplay-play-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </span>
            <span className="autoplay-label">Tap to play BG 18.66</span>
          </div>
        </div>
      )}

      {/* Now playing banner */}
      {(isPlaying || (!autoplayBlocked && !isPlaying)) && (
        <div className={`now-playing-banner ${isPlaying ? 'playing' : ''}`}>
          <button className="now-playing-btn" onClick={togglePlay}>
            <span className="now-playing-icon">
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </span>
            <span className="now-playing-text">
              {isPlaying ? 'Now Playing — BG 18.66' : 'BG 18.66'}
            </span>
            {isPlaying && (
              <span className="now-playing-wave">
                <span></span><span></span><span></span><span></span>
              </span>
            )}
          </button>
          <Link to="/verse/18/66" className="now-playing-study">Study Verse</Link>
        </div>
      )}
      <audio
        ref={audioRef}
        src="/audio/18_66.mp3"
        onEnded={handleEnded}
        preload="auto"
      />

      <h1>Verse Library</h1>
      <p className="index-subtitle">{filtered.length} verses available</p>

      <div className="filter-bar">
        <div className="filter-group">
          <label>Text</label>
          <div className="filter-pills">
            <button className={`pill ${textFilter === 'all' ? 'active' : ''}`} onClick={() => setTextFilter('all')}>All</button>
            <button className={`pill ${textFilter === 'gita' ? 'active' : ''}`} onClick={() => setTextFilter('gita')}>Bhagavad-gita</button>
            <button className={`pill ${textFilter === 'noi' ? 'active' : ''}`} onClick={() => setTextFilter('noi')}>Nectar of Instruction</button>
          </div>
        </div>
        <div className="filter-group">
          <label>Chapter</label>
          <select
            className="filter-select"
            value={chapterFilter}
            onChange={(e) => setChapterFilter(e.target.value)}
          >
            <option value="">All chapters</option>
            {gitaChapters.map((ch) => (
              <option key={ch} value={ch}>Chapter {ch}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="loading">Loading verses...</p>
      ) : filtered.length === 0 ? (
        <p className="loading">No verses match the current filters.</p>
      ) : (
        <>
          {textFilter !== 'noi' && gitaChapters.map((ch) => {
            const chVerses = filtered.filter((v) => v.source_text === 'gita' && v.chapter === ch)
            if (chVerses.length === 0) return null
            return (
              <div key={`ch-${ch}`} className="chapter-group">
                <h2 className="chapter-heading">Chapter {ch}</h2>
                <div className="verse-grid">
                  {chVerses.map((v) => (
                    <Link key={v.id} to={`/verse/${v.chapter}/${v.verse}`} className="verse-card-link">
                      <div className="verse-index-card">
                        <span className="card-ref">{verseLabel(v)}</span>
                        {v.grammar_focus && <span className="card-grammar">{v.grammar_focus}</span>}
                        <p className="card-preview">{v.translation.slice(0, 80)}...</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}

          {textFilter !== 'gita' && (() => {
            const noiVerses = filtered.filter((v) => v.source_text === 'noi')
            if (noiVerses.length === 0) return null
            return (
              <div className="chapter-group">
                <h2 className="chapter-heading">Nectar of Instruction</h2>
                <div className="verse-grid">
                  {noiVerses.map((v) => (
                    <Link key={v.id} to={`/verse/${v.chapter}/${v.verse}?source=noi`} className="verse-card-link">
                      <div className="verse-index-card">
                        <span className="card-ref">{verseLabel(v)}</span>
                        {v.grammar_focus && <span className="card-grammar">{v.grammar_focus}</span>}
                        <p className="card-preview">{v.translation.slice(0, 80)}...</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })()}
        </>
      )}
    </main>
  )
}
