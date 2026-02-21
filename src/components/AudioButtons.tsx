import { useState, useRef, useEffect } from 'react'

interface AudioButtonsProps {
  verseId: string
  chapter: number
  verse: number
}

/**
 * Two audio buttons per verse:
 *   1. Traditional Chant (placeholder)
 *   2. Gita Vibe — loads from public/audio/{chapter}_{verse}.mp3
 *
 * Gita Vibe autoplays on mount if available.
 */
export default function AudioButtons({ verseId: _verseId, chapter, verse }: AudioButtonsProps) {
  const [playingTraditional, setPlayingTraditional] = useState(false)
  const [playingVibe, setPlayingVibe] = useState(false)
  const [vibeAvailable, setVibeAvailable] = useState(false)
  const [vibeChecked, setVibeChecked] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const traditionalRef = useRef<HTMLAudioElement | null>(null)
  const vibeRef = useRef<HTMLAudioElement | null>(null)

  const vibeSrc = `/audio/${chapter}_${verse}.mp3`
  const traditionalSrc = ''

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
              .then(() => { if (!cancelled) setPlayingVibe(true) })
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
      traditionalRef.current?.play().catch(() => {})
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
        .then(() => setPlayingVibe(true))
        .catch(() => setPlayingVibe(false))
    }
  }

  function handleEnded(type: 'traditional' | 'vibe') {
    if (type === 'traditional') setPlayingTraditional(false)
    else setPlayingVibe(false)
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
