import { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import type { Verse } from '../types/verse'

const NATURE_SCENES = [
  '/videos/meditation-intro.mp4',
  '/videos/nature-sunset.mp4',
]

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
  const [videoSrc] = useState(
    () => NATURE_SCENES[Math.floor(Math.random() * NATURE_SCENES.length)]
  )
  const bgVideoRef = useRef<HTMLVideoElement>(null)
  const handleVideoReady = useCallback(() => {
    if (bgVideoRef.current) bgVideoRef.current.playbackRate = 0.55
  }, [])

  const [verses, setVerses] = useState<Verse[]>([])
  const [loading, setLoading] = useState(true)
  const [textFilter, setTextFilter] = useState<FilterMode>('all')
  const [chapterFilter, setChapterFilter] = useState<string>('')

  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

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

  // Set up Web Audio API and autoplay
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    function initAndPlay() {
      if (!audioCtxRef.current) {
        const ctx = new AudioContext()
        audioCtxRef.current = ctx
        const source = ctx.createMediaElementSource(audio)
        sourceRef.current = source
        const gain = ctx.createGain()
        gainRef.current = gain
        gain.gain.value = 0
        source.connect(gain)
        gain.connect(ctx.destination)
      }

      const ctx = audioCtxRef.current!
      const gain = gainRef.current!

      if (ctx.state === 'suspended') ctx.resume()

      audio.play()
        .then(() => {
          setIsPlaying(true)
          // Fade volume in over 2 seconds
          gain.gain.setValueAtTime(0, ctx.currentTime)
          gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 2)
        })
        .catch(() => {
          // Autoplay blocked — play on first interaction
          function playOnClick() {
            if (ctx.state === 'suspended') ctx.resume()
            audio.play()
              .then(() => {
                setIsPlaying(true)
                gain.gain.setValueAtTime(0, ctx.currentTime)
                gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 2)
              })
              .catch(() => {})
          }
          document.addEventListener('click', playOnClick, { once: true })
        })
    }

    initAndPlay()
  }, [])

  function togglePlay() {
    const audio = audioRef.current
    const ctx = audioCtxRef.current
    const gain = gainRef.current
    if (!audio || !ctx || !gain) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      if (ctx.state === 'suspended') ctx.resume()
      gain.gain.setValueAtTime(1, ctx.currentTime)
      audio.play()
        .then(() => setIsPlaying(true))
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
      {/* Water video background */}
      <div className="water-bg" aria-hidden="true">
        <video
          ref={bgVideoRef}
          key={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="water-video"
          onCanPlay={handleVideoReady}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="water-overlay"></div>
        <div className="water-glow"></div>
      </div>

      {/* Small audio toggle — bottom right corner */}
      <button className="audio-toggle" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
      <audio
        ref={audioRef}
        src="/audio/18_66.mp3"
        onEnded={handleEnded}
        preload="auto"
      />

      <div className="verse-index-content">
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
                        <p className="card-preview">{v.translation}</p>
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
                        <p className="card-preview">{v.translation}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })()}
        </>
      )}
      </div>
    </main>
  )
}
