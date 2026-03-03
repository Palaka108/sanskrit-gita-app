import { useState, useRef, useCallback } from 'react'
import { FLASHCARD_CATEGORIES, type FlashcardCategory, type FlashcardItem } from '../data/flashcardData'

const NATURE_SCENES = [
  '/videos/meditation-intro.mp4',
  '/videos/nature-sunset.mp4',
]

function FlashcardCard({ card, flipped, onFlip }: { card: FlashcardItem; flipped: boolean; onFlip: () => void }) {
  return (
    <div className={`fc-card-wrapper ${flipped ? 'flipped' : ''}`} onClick={onFlip}>
      <div className="fc-card-inner">
        {/* Front */}
        <div className="fc-card-face fc-card-front glass-card">
          <span className="fc-case-badge">{card.caseLabel}</span>
          <span className="fc-number-badge">{card.numberLabel}</span>
          <div className="fc-devanagari">{card.devanagari}</div>
          <div className="fc-translit">{card.transliteration}</div>
          <p className="fc-tap-hint">Tap to flip</p>
        </div>
        {/* Back */}
        <div className="fc-card-face fc-card-back glass-card">
          <span className="fc-case-badge">{card.caseLabel}</span>
          <div className="fc-english">{card.english}</div>
          <div className="fc-explain">{card.explanation}</div>
          <p className="fc-tap-hint">Tap to flip</p>
        </div>
      </div>
    </div>
  )
}

function CategorySelector({
  categories,
  activeId,
  onSelect,
}: {
  categories: FlashcardCategory[]
  activeId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="fc-category-row">
      {categories.map(cat => (
        <button
          key={cat.id}
          className={`fc-cat-btn ${activeId === cat.id ? 'active' : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          <span className="fc-cat-base">{cat.baseWord}</span>
          <span className="fc-cat-label">{cat.title}</span>
        </button>
      ))}
    </div>
  )
}

export default function FlashcardsPage() {
  const [activeCatId, setActiveCatId] = useState(FLASHCARD_CATEGORIES[0].id)
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const [videoSrc] = useState(
    () => NATURE_SCENES[Math.floor(Math.random() * NATURE_SCENES.length)]
  )
  const bgVideoRef = useRef<HTMLVideoElement>(null)
  const handleVideoReady = useCallback(() => {
    if (bgVideoRef.current) bgVideoRef.current.playbackRate = 0.55
  }, [])

  const category = FLASHCARD_CATEGORIES.find(c => c.id === activeCatId)!
  const cards = category.cards
  const card = cards[cardIndex]

  function selectCategory(id: string) {
    setActiveCatId(id)
    setCardIndex(0)
    setFlipped(false)
  }

  function prev() {
    setFlipped(false)
    setCardIndex(i => (i > 0 ? i - 1 : cards.length - 1))
  }

  function next() {
    setFlipped(false)
    setCardIndex(i => (i < cards.length - 1 ? i + 1 : 0))
  }

  return (
    <main className="fc-page fade-in">
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

      <div className="fc-content">
        <h1>Sanskrit Flashcards</h1>
        <p className="fc-subtitle">Master noun declensions through practice</p>

        <CategorySelector
          categories={FLASHCARD_CATEGORIES}
          activeId={activeCatId}
          onSelect={selectCategory}
        />

        <div className="fc-stage">
          <button className="fc-nav-btn fc-nav-prev" onClick={prev} aria-label="Previous card">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15,4 7,12 15,20" />
            </svg>
          </button>

          <FlashcardCard card={card} flipped={flipped} onFlip={() => setFlipped(f => !f)} />

          <button className="fc-nav-btn fc-nav-next" onClick={next} aria-label="Next card">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9,4 17,12 9,20" />
            </svg>
          </button>
        </div>

        <div className="fc-progress">
          {cardIndex + 1} / {cards.length}
        </div>
      </div>
    </main>
  )
}
