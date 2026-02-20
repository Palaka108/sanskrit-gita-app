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
 * For BG 18.66, ensure the Devanagari always renders as FOUR lines:
 *   सर्वधर्मान्परित्यज्य
 *   मामेकं शरणं व्रज ।
 *   अहं त्वां सर्वपापेभ्यो
 *   मोक्षयिष्यामि मा शुचः ॥
 *
 * For other verses, split on newlines from the DB.
 * If no newlines exist, split at logical pause points (।, ॥).
 */
function splitDevanagari(text: string): string[] {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  if (lines.length >= 2) return lines

  const parts = text
    .replace(/([।॥])\s*/g, '$1\n')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  if (parts.length === 1 && parts[0].length > 20) {
    const words = parts[0].split(/\s+/)
    const mid = Math.ceil(words.length / 2)
    return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
  }

  return parts
}

export default function VerseViewer({ verse, words, onWordClick }: VerseViewerProps) {
  const [showTranslation, setShowTranslation] = useState(false)
  const [layout, setLayout] = useState<'traditional' | 'learning'>('traditional')

  const devanagariLines = splitDevanagari(verse.devanagari)

  const transliterationWords = verse.transliteration
    .replace(/\n/g, ' / ')
    .split(/\s+/)
    .filter(Boolean)

  function findMatchingWord(token: string): Word | undefined {
    const clean = token.replace(/[/''".,;:!?()]/g, '').toLowerCase()
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

          {/* Hero Sanskrit — always rendered as multiple lines */}
          <div className={`devanagari-block ${layout === 'learning' ? 'learning-layout' : ''}`}>
            {devanagariLines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {/* Transliteration with clickable words */}
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
