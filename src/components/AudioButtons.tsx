import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthProvider'
import { supabase } from '../lib/supabaseClient'

interface AudioButtonsProps {
  verseId: string
  chapter: number
  verse: number
}

/** Ordered playlist of all verses with Gita Vibe audio */
const PLAYLIST: { chapter: number; verse: number }[] = [
  { chapter: 1, verse: 1 },
  { chapter: 1, verse: 2 },
  { chapter: 1, verse: 3 },
  { chapter: 1, verse: 4 },
  { chapter: 2, verse: 14 },
  { chapter: 2, verse: 20 },
  { chapter: 3, verse: 13 },
  { chapter: 3, verse: 27 },
  { chapter: 3, verse: 37 },
  { chapter: 4, verse: 2 },
  { chapter: 4, verse: 8 },
  { chapter: 4, verse: 34 },
  { chapter: 5, verse: 29 },
  { chapter: 6, verse: 47 },
  { chapter: 7, verse: 3 },
  { chapter: 7, verse: 14 },
  { chapter: 8, verse: 5 },
  { chapter: 9, verse: 14 },
  { chapter: 18, verse: 66 },
]

function findPlaylistIndex(chapter: number, verse: number): number {
  return PLAYLIST.findIndex(p => p.chapter === chapter && p.verse === verse)
}

/**
 * Audio player with:
 *   1. Traditional Chant (placeholder)
 *   2. Gita Vibe — loads from public/audio/{chapter}_{verse}.mp3
 *   3. Playlist controls: prev / next / auto-play toggle
 *
 * Gita Vibe autoplays on mount if available.
 */
export default function AudioButtons({ verseId: _verseId, chapter, verse }: AudioButtonsProps) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const lastLogRef = useRef<string>('')

  /** Log a listen event (debounced: skip if same verse+track within 5s) */
  function logListen(trackType: 'gita_vibe' | 'traditional') {
    if (!user) return
    const key = `${chapter}:${verse}:${trackType}`
    if (lastLogRef.current === key) return
    lastLogRef.current = key
    setTimeout(() => { if (lastLogRef.current === key) lastLogRef.current = '' }, 5000)

    supabase.from('verse_listens').insert({
      user_id: user.id,
      chapter,
      verse,
      track_type: trackType,
    }).then(() => {})
  }

  const [playingTraditional, setPlayingTraditional] = useState(false)
  const [playingVibe, setPlayingVibe] = useState(false)
  const [vibeAvailable, setVibeAvailable] = useState(false)
  const [vibeChecked, setVibeChecked] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [autoPlayNext, setAutoPlayNext] = useState(false)
  const traditionalRef = useRef<HTMLAudioElement | null>(null)
  const vibeRef = useRef<HTMLAudioElement | null>(null)

  const vibeSrc = `/audio/${chapter}_${verse}.mp3`
  const traditionalSrc = ''

  const currentIdx = findPlaylistIndex(chapter, verse)
  const hasPrev = currentIdx > 0
  const hasNext = currentIdx >= 0 && currentIdx < PLAYLIST.length - 1
  const isInPlaylist = currentIdx >= 0

  // Navigate to a playlist item
  const goToVerse = useCallback((idx: number) => {
    if (idx < 0 || idx >= PLAYLIST.length) return
    const target = PLAYLIST[idx]
    navigate(`/verse/${target.chapter}/${target.verse}`)
  }, [navigate])

  // Probe whether the vibe mp3 exists using fetch HEAD, then autoplay
  useEffect(() => {
    let cancelled = false
    setVibeAvailable(false)
    setVibeChecked(false)
    setPlayingVibe(false)

    fetch(vibeSrc, { method: 'HEAD' })
      .then(res => {
        if (cancelled) return
        if (res.ok) {
          setVibeAvailable(true)
          setVibeChecked(true)
          // Autoplay after a tiny delay so the audio element has the src
          setTimeout(() => {
            const audio = vibeRef.current
            if (!audio || cancelled) return
            audio.src = vibeSrc
            audio.volume = volume
            audio.muted = muted
            audio.load()
            audio.play()
              .then(() => { if (!cancelled) { setPlayingVibe(true); logListen('gita_vibe') } })
              .catch(() => { if (!cancelled) setPlayingVibe(false) })
          }, 50)
        } else {
          setVibeAvailable(false)
          setVibeChecked(true)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setVibeAvailable(false)
          setVibeChecked(true)
        }
      })

    return () => {
      cancelled = true
      vibeRef.current?.pause()
    }
  }, [chapter, verse, vibeSrc])

  // Sync volume to both audio elements
  useEffect(() => {
    if (vibeRef.current) vibeRef.current.volume = volume
    if (traditionalRef.current) traditionalRef.current.volume = volume
  }, [volume])

  // Sync mute
  useEffect(() => {
    if (vibeRef.current) vibeRef.current.muted = muted
    if (traditionalRef.current) traditionalRef.current.muted = muted
  }, [muted])

  function toggleTraditional() {
    if (playingTraditional) {
      traditionalRef.current?.pause()
      setPlayingTraditional(false)
    } else {
      if (playingVibe) {
        vibeRef.current?.pause()
        setPlayingVibe(false)
      }
      traditionalRef.current?.play().then(() => logListen('traditional')).catch(() => {})
      setPlayingTraditional(true)
    }
  }

  function toggleVibe() {
    const audio = vibeRef.current
    if (!audio) return
    if (playingVibe) {
      audio.pause()
      setPlayingVibe(false)
    } else {
      if (playingTraditional) {
        traditionalRef.current?.pause()
        setPlayingTraditional(false)
      }
      // Make sure src is set
      if (!audio.src || audio.src === window.location.href) {
        audio.src = vibeSrc
        audio.load()
      }
      audio.volume = volume
      audio.muted = muted
      audio.play()
        .then(() => { setPlayingVibe(true); logListen('gita_vibe') })
        .catch(() => setPlayingVibe(false))
    }
  }

  function handleVibeEnded() {
    setPlayingVibe(false)
    // Auto-play next song if enabled
    if (autoPlayNext && hasNext) {
      goToVerse(currentIdx + 1)
    }
  }

  function handleEnded(type: 'traditional' | 'vibe') {
    if (type === 'traditional') setPlayingTraditional(false)
    else handleVibeEnded()
  }

  const toggleMute = () => setMuted(m => !m)

  return (
    <div className="audio-buttons">
      <button
        className={`audio-btn audio-btn-traditional ${playingTraditional ? 'playing' : ''}`}
        onClick={toggleTraditional}
        disabled={!traditionalSrc}
        title={traditionalSrc ? 'Play Traditional Chant' : 'Audio coming soon'}
      >
        <span className="audio-icon">
          {playingTraditional ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </span>
        <span className="audio-label">Traditional Chant</span>
        {playingTraditional && <span className="audio-wave"><span></span><span></span><span></span><span></span></span>}
        {!traditionalSrc && <span className="audio-soon">Coming Soon</span>}
      </button>

      <button
        className={`audio-btn audio-btn-vibe ${playingVibe ? 'playing' : ''}`}
        onClick={toggleVibe}
        disabled={!vibeAvailable}
        title={vibeAvailable ? 'Play Gita Vibe' : 'Audio coming soon'}
      >
        <span className="audio-icon">
          {playingVibe ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </span>
        <span className="audio-label">Gita Vibe</span>
        {playingVibe && <span className="audio-wave"><span></span><span></span><span></span><span></span></span>}
        {vibeChecked && !vibeAvailable && <span className="audio-soon">Coming Soon</span>}
      </button>

      {/* Playlist controls — prev / next / auto-play */}
      {isInPlaylist && (
        <div className="playlist-controls">
          <button
            className="playlist-btn playlist-arrow"
            onClick={() => goToVerse(currentIdx - 1)}
            disabled={!hasPrev}
            title={hasPrev ? `Previous: Bg ${PLAYLIST[currentIdx - 1].chapter}.${PLAYLIST[currentIdx - 1].verse}` : 'No previous track'}
            aria-label="Previous track"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15,4 7,12 15,20" />
            </svg>
          </button>

          <span className="playlist-position">
            {currentIdx + 1} / {PLAYLIST.length}
          </span>

          <button
            className="playlist-btn playlist-arrow"
            onClick={() => goToVerse(currentIdx + 1)}
            disabled={!hasNext}
            title={hasNext ? `Next: Bg ${PLAYLIST[currentIdx + 1].chapter}.${PLAYLIST[currentIdx + 1].verse}` : 'No next track'}
            aria-label="Next track"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9,4 17,12 9,20" />
            </svg>
          </button>

          <button
            className={`playlist-btn playlist-auto ${autoPlayNext ? 'active' : ''}`}
            onClick={() => setAutoPlayNext(a => !a)}
            title={autoPlayNext ? 'Auto-play ON — will play next verse' : 'Auto-play OFF — tap to enable playlist mode'}
            aria-label="Toggle auto-play"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="17,1 21,5 17,9" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <polyline points="7,23 3,19 7,15" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
          </button>
        </div>
      )}

      {/* Volume controls */}
      {(vibeAvailable || traditionalSrc) && (
        <div className="audio-volume-row">
          <button
            className="audio-mute-btn"
            onClick={toggleMute}
            title={muted ? 'Unmute' : 'Mute'}
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
          </button>
          <input
            type="range"
            className="audio-volume-slider"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={e => {
              const v = parseFloat(e.target.value)
              setVolume(v)
              if (v > 0 && muted) setMuted(false)
            }}
            aria-label="Volume"
            title={`Volume: ${Math.round((muted ? 0 : volume) * 100)}%`}
          />
        </div>
      )}

      {/* Hidden audio elements */}
      <audio
        ref={traditionalRef}
        src={traditionalSrc || undefined}
        onEnded={() => handleEnded('traditional')}
        preload="none"
      />
      <audio
        ref={vibeRef}
        onEnded={() => handleEnded('vibe')}
        onPause={() => setPlayingVibe(false)}
        onPlay={() => setPlayingVibe(true)}
        preload="auto"
      />
    </div>
  )
}
