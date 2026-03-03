import { useState, useRef, useCallback } from 'react'

const NATURE_SCENES = [
  '/videos/meditation-intro.mp4',
  '/videos/nature-sunset.mp4',
]

export default function PrivacyPage() {
  const [videoSrc] = useState(
    () => NATURE_SCENES[Math.floor(Math.random() * NATURE_SCENES.length)]
  )
  const bgVideoRef = useRef<HTMLVideoElement>(null)
  const handleVideoReady = useCallback(() => {
    if (bgVideoRef.current) bgVideoRef.current.playbackRate = 0.55
  }, [])

  return (
    <main className="about-page fade-in">
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
          <h2>Privacy Policy</h2>
          <p><strong>Last updated:</strong> March 2, 2026</p>
          <p>
            Gita Gift ("we", "our", "the app") is a devotional Sanskrit study
            tool for the Bhagavad Gita. We respect your privacy and are
            committed to protecting your personal data.
          </p>
        </section>

        <section className="about-section glass-card">
          <h2>Information We Collect</h2>
          <p><strong>Account information:</strong> When you sign in with Google,
            we receive your name and email address from your Google account.
            We store your first name to personalize your experience.</p>
          <p><strong>Usage data:</strong> We record which verses you listen to
            and when, so you can track your study progress on your dashboard.</p>
          <p><strong>No sensitive data:</strong> We do not collect payment
            information, location data, contacts, or device identifiers.</p>
        </section>

        <section className="about-section glass-card">
          <h2>How We Use Your Data</h2>
          <p>Your data is used solely to:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Display your name in the app</li>
            <li>Track your verse listening history</li>
            <li>Show your study progress on the dashboard</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            We do not sell, share, or transfer your personal data to third
            parties for advertising or marketing purposes.
          </p>
        </section>

        <section className="about-section glass-card">
          <h2>Data Storage</h2>
          <p>
            Your data is stored securely on Supabase (hosted on AWS).
            Authentication is handled by Google OAuth through Supabase Auth.
            All data transmission is encrypted via HTTPS.
          </p>
        </section>

        <section className="about-section glass-card">
          <h2>Third-Party Services</h2>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><strong>Google OAuth</strong> &mdash; for sign-in authentication</li>
            <li><strong>Supabase</strong> &mdash; for database and authentication services</li>
            <li><strong>Vercel</strong> &mdash; for web hosting</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            Each service has its own privacy policy governing their handling of
            your data.
          </p>
        </section>

        <section className="about-section glass-card">
          <h2>Your Rights</h2>
          <p>You may at any time:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Request a copy of your stored data</li>
            <li>Request deletion of your account and all associated data</li>
            <li>Revoke Google sign-in access from your Google account settings</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>
            To make a request, contact us at{' '}
            <a href="mailto:businessexpense108@gmail.com" style={{ color: '#C6A75E' }}>
              businessexpense108@gmail.com
            </a>.
          </p>
        </section>

        <section className="about-section glass-card">
          <h2>Children's Privacy</h2>
          <p>
            This app is not directed at children under 13. We do not knowingly
            collect data from children. If you believe a child has provided us
            with personal data, please contact us and we will delete it.
          </p>
        </section>

        <section className="about-section glass-card">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Any changes will be
            reflected on this page with an updated date. Continued use of the
            app constitutes acceptance of the revised policy.
          </p>
        </section>
      </div>
    </main>
  )
}
