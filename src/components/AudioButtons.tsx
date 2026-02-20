import { useState, useRef } from 'react'

interface AudioButtonsProps {
  verseId: string
}

/**
 * Two large audio buttons per verse:
 *   1. Traditional Chant
 *   2. Gita Vibe — Trap Trance
 *
 * Uses placeholder audio for now.
 * Structured to accept Supabase storage URLs later.
 */
export default function AudioButtons({ verseId }: AudioButtonsProps) {
  const [playingTraditional, setPlayingTraditional] = useState(false)
  const [playingVibe, setPlayingVibe] = useState(false)
  const traditionalRef = useRef<HTMLAudioElement | null>(null)
  const vibeRef = useRef<HTMLAudioElement | null>(null)

  function toggleTraditional() {
    if (playingTraditional) {
      traditionalRef.current?.pause()
      setPlayingTraditional(false)
    } else {
      // Stop the other if playing
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

  // Placeholder: replace with Supabase storage URLs when audio is uploaded
  const traditionalSrc = verseId ? '' : ''
  const vibeSrc = verseId ? '' : ''

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
        disabled={!vibeSrc}
        title={vibeSrc ? 'Play Gita Vibe' : 'Audio coming soon'}
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
        {!vibeSrc && <span className="audio-soon">Coming Soon</span>}
      </button>

      {/* Hidden audio elements — src will be populated from Supabase later */}
      <audio
        ref={traditionalRef}
        src={traditionalSrc || undefined}
        onEnded={() => handleEnded('traditional')}
        preload="none"
      />
      <audio
        ref={vibeRef}
        src={vibeSrc || undefined}
        onEnded={() => handleEnded('vibe')}
        preload="none"
      />
    </div>
  )
}
