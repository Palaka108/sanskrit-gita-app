import { useNavigate } from 'react-router-dom'

interface VerseNavProps {
  hasWords: boolean
  hasCommentaries: boolean
}

/**
 * Elegant section navigation buttons for the verse page.
 * Smooth-scrolls to each section, with a Home button to return to /.
 */
export default function VerseNav({ hasWords, hasCommentaries }: VerseNavProps) {
  const navigate = useNavigate()

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="verse-nav" aria-label="Verse sections">
      <button className="verse-nav-btn verse-nav-home" onClick={() => navigate('/')} title="All Verses">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        <span>All Verses</span>
      </button>

      {hasWords && (
        <button className="verse-nav-btn" onClick={() => scrollTo('section-word-by-word')} title="Word by Word">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16" />
            <path d="M4 12h10" />
            <path d="M4 17h12" />
          </svg>
          <span>Word by Word</span>
        </button>
      )}

      <button className="verse-nav-btn" onClick={() => scrollTo('section-grammar')} title="Grammar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span>Grammar</span>
      </button>

      {hasCommentaries && (
        <button className="verse-nav-btn" onClick={() => scrollTo('section-acaryas')} title="Ācārya Commentaries">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
          </svg>
          <span>Ācāryas</span>
        </button>
      )}

      {hasWords && (
        <button className="verse-nav-btn" onClick={() => scrollTo('section-flashcard')} title="Flashcard Quiz">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M12 8v4l2 2" />
          </svg>
          <span>Flashcard</span>
        </button>
      )}
    </nav>
  )
}
