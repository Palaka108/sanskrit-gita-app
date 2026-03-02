import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/AuthProvider'
import LotusWatermark from '../components/LotusWatermark'

const NATURE_SCENES = [
  '/videos/meditation-intro.mp4',
  '/videos/nature-sunset.mp4',
]

export default function Home() {
  const { user, loading, signIn } = useAuth()

  const [videoSrc] = useState(
    () => NATURE_SCENES[Math.floor(Math.random() * NATURE_SCENES.length)]
  )
  const bgVideoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioBlocked, setAudioBlocked] = useState(false)
  const [entered, setEntered] = useState(false)

  const handleVideoReady = useCallback(() => {
    if (bgVideoRef.current) bgVideoRef.current.playbackRate = 0.45
  }, [])

  // Try autoplay audio on mount (only for non-signed-in visitors)
  useEffect(() => {
    if (user || loading) return
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0
    audio.play()
      .then(() => {
        setEntered(true)
        let v = 0
        const interval = setInterval(() => {
          v += 0.02
          if (v >= 0.7) { v = 0.7; clearInterval(interval) }
          if (audio) audio.volume = v
        }, 60)
      })
      .catch(() => {
        setAudioBlocked(true)
      })
  }, [user, loading])

  function handleTapToEnter() {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0
      audio.play().then(() => {
        let v = 0
        const interval = setInterval(() => {
          v += 0.02
          if (v >= 0.7) { v = 0.7; clearInterval(interval) }
          if (audio) audio.volume = v
        }, 60)
      }).catch(() => {})
    }
    setAudioBlocked(false)
    setEntered(true)
  }

  // ─── Signed-in users: normal home page ───
  if (user) {
    return (
      <main className="home-page">
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

        <div className="sacred-geometry" aria-hidden="true">
          <div className="geo-shape geo-diamond"></div>
          <div className="geo-shape geo-circle"></div>
          <div className="geo-shape geo-ring"></div>
        </div>
        <div className="home-lotus-wrap">
          <LotusWatermark />
        </div>
        <h1>Gita Gift</h1>
        <div className="gold-hairline" aria-hidden="true"></div>
        <p className="subtitle">A Devotional Tool for Sastra Meditation</p>
        <div className="home-actions">
          <Link to="/verses" className="btn btn-primary">Browse All Verses</Link>
          <Link to="/verse/18/66" className="btn btn-secondary">Study BG 18.66</Link>
        </div>
      </main>
    )
  }

  // ─── Not signed in: immersive login experience ───
  return (
    <main className="login-page">
      {/* Water background — fullscreen */}
      <div className="water-bg login-water-bg" aria-hidden="true">
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
        <div className="water-overlay login-overlay"></div>
        <div className="water-glow"></div>
      </div>

      {/* Hidden audio: BG 18.66 */}
      <audio ref={audioRef} src="/audio/18_66.mp3" loop preload="auto" />

      {/* Tap to enter overlay (if autoplay blocked) */}
      {audioBlocked && !entered && (
        <div className="login-tap-overlay" onClick={handleTapToEnter}>
          <div className="login-tap-content">
            <div className="login-tap-om">&#x0950;</div>
            <p>Tap to Enter</p>
          </div>
        </div>
      )}

      {/* Login panel */}
      <div className={`login-panel glass-card ${entered || !audioBlocked ? 'visible' : ''}`}>
        <h1 className="login-title">Gita Gift</h1>
        <div className="login-gold-line" aria-hidden="true"></div>
        <p className="login-tagline">
          A Devotional Tool for Sastra Meditation
        </p>
        <button className="login-google-btn" onClick={signIn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>
        <p className="login-note">Sign in to track your listening progress</p>
      </div>
    </main>
  )
}
