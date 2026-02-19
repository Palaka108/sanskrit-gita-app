import { useState } from 'react'

interface Card {
  devanagari: string
  transliteration: string
}

const DEVANAGARI_CARDS: Card[] = [
  { devanagari: 'अ', transliteration: 'a' },
  { devanagari: 'आ', transliteration: 'ā' },
  { devanagari: 'इ', transliteration: 'i' },
  { devanagari: 'ई', transliteration: 'ī' },
  { devanagari: 'उ', transliteration: 'u' },
  { devanagari: 'ऊ', transliteration: 'ū' },
  { devanagari: 'ए', transliteration: 'e' },
  { devanagari: 'ऐ', transliteration: 'ai' },
  { devanagari: 'ओ', transliteration: 'o' },
  { devanagari: 'औ', transliteration: 'au' },
  { devanagari: 'क', transliteration: 'ka' },
  { devanagari: 'ख', transliteration: 'kha' },
  { devanagari: 'ग', transliteration: 'ga' },
  { devanagari: 'घ', transliteration: 'gha' },
  { devanagari: 'च', transliteration: 'ca' },
  { devanagari: 'छ', transliteration: 'cha' },
  { devanagari: 'ज', transliteration: 'ja' },
  { devanagari: 'झ', transliteration: 'jha' },
  { devanagari: 'ट', transliteration: 'ṭa' },
  { devanagari: 'ड', transliteration: 'ḍa' },
  { devanagari: 'त', transliteration: 'ta' },
  { devanagari: 'थ', transliteration: 'tha' },
  { devanagari: 'द', transliteration: 'da' },
  { devanagari: 'ध', transliteration: 'dha' },
  { devanagari: 'न', transliteration: 'na' },
  { devanagari: 'प', transliteration: 'pa' },
  { devanagari: 'फ', transliteration: 'pha' },
  { devanagari: 'ब', transliteration: 'ba' },
  { devanagari: 'भ', transliteration: 'bha' },
  { devanagari: 'म', transliteration: 'ma' },
  { devanagari: 'य', transliteration: 'ya' },
  { devanagari: 'र', transliteration: 'ra' },
  { devanagari: 'ल', transliteration: 'la' },
  { devanagari: 'व', transliteration: 'va' },
  { devanagari: 'श', transliteration: 'śa' },
  { devanagari: 'ष', transliteration: 'ṣa' },
  { devanagari: 'स', transliteration: 'sa' },
  { devanagari: 'ह', transliteration: 'ha' },
]

export default function DevanagariTrainer() {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const card = DEVANAGARI_CARDS[index]

  function next() {
    setFlipped(false)
    setIndex((i) => (i + 1) % DEVANAGARI_CARDS.length)
  }

  function prev() {
    setFlipped(false)
    setIndex((i) => (i - 1 + DEVANAGARI_CARDS.length) % DEVANAGARI_CARDS.length)
  }

  return (
    <section className="devanagari-trainer">
      <h3>Devanagari Trainer</h3>
      <p className="trainer-counter">{index + 1} / {DEVANAGARI_CARDS.length}</p>
      <div
        className={`trainer-card ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        {flipped ? (
          <span className="trainer-transliteration">{card.transliteration}</span>
        ) : (
          <span className="trainer-devanagari">{card.devanagari}</span>
        )}
      </div>
      <p className="trainer-hint">Click card to flip</p>
      <div className="trainer-nav">
        <button className="btn" onClick={prev}>Previous</button>
        <button className="btn" onClick={next}>Next</button>
      </div>
      <div className="trainer-sound-placeholder">
        <p>Sound playback coming in a future version.</p>
      </div>
    </section>
  )
}
