import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

const NATURE_SCENES = [
  '/videos/meditation-intro.mp4',
  '/videos/nature-sunset.mp4',
]

export default function AboutPage() {
  const [videoSrc] = useState(
    () => NATURE_SCENES[Math.floor(Math.random() * NATURE_SCENES.length)]
  )
  const bgVideoRef = useRef<HTMLVideoElement>(null)
  const handleVideoReady = useCallback(() => {
    if (bgVideoRef.current) bgVideoRef.current.playbackRate = 0.55
  }, [])

  return (
    <main className="about-page fade-in">
      {/* Water background */}
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

      <div className="about-content">
        <section className="about-section glass-card">
          <h2>Our Mission</h2>
          <p>
            To make the sacred wisdom of the Bhagavad Gita accessible through
            the beauty of its original Sanskrit. We believe that hearing,
            reading, and understanding the verses in their divine language
            deepens the connection between the student and the teaching.
          </p>
        </section>

        <section className="about-section glass-card">
          <h2>Why Sanskrit?</h2>
          <p>
            Sanskrit is not merely a language &mdash; it is the vibrational
            fabric of Vedic wisdom. Each syllable carries meaning, energy, and
            intention. By studying the grammar, declensions, and roots, we
            unlock layers of understanding that translations alone cannot convey.
          </p>
        </section>

        <section className="about-section glass-card">
          <h2>Why the Gita?</h2>
          <p>
            The Bhagavad Gita is the essence of all Vedic literature.
            Spoken on the battlefield of Kurukshetra, its 700 verses
            illuminate the nature of the self, the purpose of action, and
            the path of devotion. It is a timeless guide for every sincere seeker.
          </p>
        </section>

        <section className="about-section glass-card">
          <h2>Future Vision</h2>
          <p>
            We are building toward a complete interactive Sanskrit learning
            platform: spaced-repetition flashcards, verse-by-verse grammar
            breakdowns, audio recitation with synchronized highlighting, and
            a community of learners united in the study of sacred texts.
          </p>
        </section>

        <section className="about-section glass-card" style={{ textAlign: 'center' }}>
          <Link to="/privacy" style={{ color: '#C6A75E', textDecoration: 'none' }}>
            Privacy Policy
          </Link>
        </section>
      </div>
    </main>
  )
}
