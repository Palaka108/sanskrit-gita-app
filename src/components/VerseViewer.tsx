import { useState } from 'react'
import type { Verse } from '../types/verse'
import type { Word } from '../types/grammar'
import FiligreeBorder from './FiligreeBorder'
import LotusWatermark from './LotusWatermark'

interface VerseViewerProps {
  verse: Verse
  words: Word[]
  onWordClick: (word: Word) => void
}

function verseLabel(verse: Verse): string {
  if (verse.source_text === 'noi') {
    return `Nectar of Instruction, Verse ${verse.verse}`
  }
  return `Bhagavad-gita ${verse.chapter}.${verse.verse}`
}

export default function VerseViewer({ verse, words, onWordClick }: VerseViewerProps) {
  const [showTranslation, setShowTranslation] = useState(false)

  const transliterationWords = verse.transliteration
    .replace(/\n/g, ' / ')
    .split(/\s+/)
    .filter(Boolean)

  function findMatchingWord(token: string): Word | undefined {
    const clean = token.replace(/[/''"]/g, '').toLowerCase()
    if (!clean) return undefined
    return words.find((w) => {
      const wLower = w.word.toLowerCase()
      return clean === wLower || clean.startsWith(wLower) || wLower.startsWith(clean)
    })
  }

  return (
    <section className="verse-viewer">
      <h2>{verseLabel(verse)}</h2>

      {verse.grammar_focus && (
        <div className="grammar-focus-badge">
          Grammar Focus: {verse.grammar_focus}
        </div>
      )}

      <FiligreeBorder>
        <div className="verse-card-inner">
          <LotusWatermark />
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
                  title={match ? `Click for grammar: ${match.meaning}` : undefined}
                >
                  {token}{' '}
                </span>
              )
            })}
          </div>
        </div>
      </FiligreeBorder>

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
