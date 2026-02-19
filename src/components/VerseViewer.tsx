import { useState } from 'react'
import type { Verse } from '../types/verse'
import type { Word } from '../types/grammar'

interface VerseViewerProps {
  verse: Verse
  words: Word[]
  onWordClick: (word: Word) => void
}

export default function VerseViewer({ verse, words, onWordClick }: VerseViewerProps) {
  const [showTranslation, setShowTranslation] = useState(false)

  const transliterationWords = verse.transliteration
    .replace(/\n/g, ' / ')
    .split(/\s+/)
    .filter(Boolean)

  function findMatchingWord(token: string): Word | undefined {
    const clean = token.replace(/[/]/g, '').toLowerCase()
    return words.find((w) => {
      const wLower = w.word.toLowerCase()
      return clean === wLower || clean.startsWith(wLower) || wLower.startsWith(clean)
    })
  }

  return (
    <section className="verse-viewer">
      <h2>Chapter {verse.chapter}, Verse {verse.verse}</h2>

      <div className="devanagari-block">
        {verse.devanagari.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="transliteration-block">
        {transliterationWords.map((token, i) => {
          if (token === '/') {
            return <span key={i} className="line-break"> / </span>
          }
          const match = findMatchingWord(token)
          return (
            <span
              key={i}
              className={match ? 'word-clickable' : 'word-plain'}
              onClick={match ? () => onWordClick(match) : undefined}
            >
              {token}{' '}
            </span>
          )
        })}
      </div>

      <button
        className="translation-toggle"
        onClick={() => setShowTranslation(!showTranslation)}
      >
        {showTranslation ? 'Hide Translation' : 'Show Translation'}
      </button>

      {showTranslation && (
        <div className="translation-block">
          <p>{verse.translation}</p>
        </div>
      )}
    </section>
  )
}
