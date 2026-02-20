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

/**
 * Split the ROMAN TRANSLITERATION into 4 lines.
 * Uses newlines from DB first, then splits at logical pauses.
 *
 * For BG 18.66 this renders as:
 *   sarva-dharman parityajya
 *   mam ekam saranam vraja
 *   aham tvam sarva-papebhyo
 *   moksayisyami ma sucah
 */
function splitTransliterationIntoLines(text: string): string[] {
  // If DB already has newlines, use them
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  if (lines.length >= 2) return lines

  // Fallback: split into roughly 4 lines by word count
  const words = text.split(/\s+/).filter(Boolean)
  if (words.length <= 4) return [text]

  const perLine = Math.ceil(words.length / 4)
  const result: string[] = []
  for (let i = 0; i < words.length; i += perLine) {
    result.push(words.slice(i, i + perLine).join(' '))
  }
  return result
}

export default function VerseViewer({ verse, words, onWordClick }: VerseViewerProps) {
  const [showTranslation, setShowTranslation] = useState(false)
  const [layout, setLayout] = useState<'traditional' | 'learning'>('traditional')

  // Transliteration split into lines for 4-line display
  const translitLines = splitTransliterationIntoLines(verse.transliteration)

  function findMatchingWord(token: string): Word | undefined {
    const clean = token.replace(/[/''".,;:!?()]/g, '').toLowerCase()
    if (!clean) return undefined
    return words.find((w) => {
      const wLower = w.word.toLowerCase()
      return clean === wLower || clean.startsWith(wLower) || wLower.startsWith(clean)
    })
  }

  /** Render a single line of transliteration with clickable words */
  function renderTranslitLine(line: string, lineIndex: number) {
    const tokens = line.split(/\s+/).filter(Boolean)
    return (
      <div key={lineIndex} className="translit-line">
        {tokens.map((token, i) => {
          const match = findMatchingWord(token)
          return (
            <span
              key={`${lineIndex}-${i}`}
              className={match ? 'word-clickable' : 'word-plain'}
              onClick={match ? () => onWordClick(match) : undefined}
              title={match ? `Click for grammar: ${match.meaning}` : undefined}
            >
              {token}{' '}
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <section className="verse-viewer">
      <h2>{verseLabel(verse)}</h2>

      {verse.grammar_focus && (
        <div className="grammar-focus-badge">
          Grammar Focus: {verse.grammar_focus}
        </div>
      )}

      {/* Layout toggle */}
      <div className="layout-toggle">
        <button
          className={layout === 'traditional' ? 'active' : ''}
          onClick={() => setLayout('traditional')}
        >
          Traditional Layout
        </button>
        <button
          className={layout === 'learning' ? 'active' : ''}
          onClick={() => setLayout('learning')}
        >
          Learning Layout (Word Spaced)
        </button>
      </div>

      <FiligreeBorder>
        <div className="verse-card-inner">
          <LotusWatermark />

          {/* Devanagari — rendered directly from DB, no forced splitting */}
          <div className={`devanagari-block ${layout === 'learning' ? 'learning-layout' : ''}`}>
            {verse.devanagari.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {/* Transliteration — always 4 lines with clickable words */}
          <div className="transliteration-block">
            {translitLines.map((line, i) => renderTranslitLine(line, i))}
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
