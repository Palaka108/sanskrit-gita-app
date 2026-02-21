import { useState, useRef, useEffect } from 'react'

interface AudioButtonsProps {
  verseId: string
  chapter: number
  verse: number
}

/**
 * Two large audio buttons per verse:
 *   1. Traditional Chant
 *   2. Gita Vibe — Trap Trance
 *
 * Gita Vibe loads from public/audio/{chapter}_{verse}.mp3
 * Traditional Chant placeholder until Supabase storage URLs added.
 */
export default function AudioButtons({ verseId, chapter, verse }: AudioButtonsProps) {
  const [playingTraditional, setPlayingTraditional] = useState(false)
  const [playingVibe, setPlayingVibe] = useState(false)
  const [vibeAvailable, setVibeAvailable] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const traditionalRef = useRef<HTMLAudioElement | null>(null)
  const vibeRef = useRef<HTMLAudioElement | null>(null)

  // Build local file path for Gita Vibe audio
  const vibeSrc = `/audio/${chapter}_${verse}.mp3`

  // Placeholder: replace with Supabase storage URLs when audio is uploaded
  const traditionalSrc = ''

  // Check if vibe audio exists and autoplay it
  useEffect(() => {
    const audio = vibeRef.current
    if (!audio) return

    audio.volume = volume
    audio.muted = muted

    const onCanPlay = () => {
      setVibeAvailable(true)
      // Autoplay the Gita Vibe when entering the verse
      audio.play()
        .then(() => setPlayingVibe(true))
        .catch(() => setPlayingVibe(false))
    }

    const onError = () => {
      setVibeAvailable(false)
    }

    audio.addEventListener('canplaythrough', onCanPlay)
    audio.addEventListener('error', onError)
    audio.load()

    return () => {
      audio.removeEventListener('canplaythrough', onCanPlay)
      audio.removeEventListener('error', onError)
      audio.pause()
    }
  }, [chapter, verse])

  // Sync volume
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
    if (playingVibe) {
      vibeRef.current?.pause()
      setPlayingVibe(false)
    } else {
      if (playingTraditional) {
        traditionalRef.current?.pause()
        setPlayingTraditional(false)
      }
      vibeRef.current?.play().catch(() => {})
      setPlayingVibe(true)
    }
  }

  function handleEnded(type: 'traditional' | 'vibe') {
    if (type === 'traditional') setPlayingTraditional(false)
    else setPlayingVibe(false)
  }

  const toggleMute = () => setMuted(m => !m)

  const isAnyPlaying = playingTraditional || playingVibe

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
        <span className="audio-label">Gita Vibe — Trap Trance</span>
        {playingVibe && <span className="audio-wave"><span></span><span></span><span></span><span></span></span>}
        {!vibeAvailable && <span className="audio-soon">Coming Soon</span>}
      </button>

      {/* Volume controls — shown when any audio is available */}
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
        key={vibeSrc}
        src={vibeSrc}
        onEnded={() => handleEnded('vibe')}
        preload="auto"
      />
    </div>
  )
}
