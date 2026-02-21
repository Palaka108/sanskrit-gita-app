import { useState } from 'react'
import type { Verse } from '../types/verse'
import type { Word } from '../types/grammar'
import { formatVerseToFourLines } from '../utils/formatVerse'

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
  const [devanagariOpen, setDevanagariOpen] = useState(false)

  // 4-line split for both transliteration and devanagari
  const translitLines = formatVerseToFourLines(verse.transliteration)
  const devanagariLines = formatVerseToFourLines(verse.devanagari)

  function findMatchingWord(token: string): Word | undefined {
    const clean = token.replace(/[/''".,;:!?()|\u0964\u0965]/g, '').toLowerCase()
    if (!clean) return undefined
    return words.find((w) => {
      const wLower = w.word.toLowerCase()
      return clean === wLower || clean.startsWith(wLower) || wLower.startsWith(clean)
    })
  }

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
    <section className="verse-viewer fade-in">
      <h2 className="verse-label">{verseLabel(verse)}</h2>

      {verse.grammar_focus && (
        <div className="grammar-focus-badge">
          Grammar Focus: {verse.grammar_focus}
        </div>
      )}

      {/* ---- 1. ROMAN TRANSLITERATION (hero, 4 lines) ---- */}
      <div className="glass-card verse-hero-card">
        <div className="transliteration-block hero-translit">
          {translitLines.map((line, i) => renderTranslitLine(line, i))}
        </div>
      </div>

      {/* ---- 2. ENGLISH TRANSLATION (always visible) ---- */}
      <div className="translation-block always-visible">
        <p>{verse.translation}</p>
      </div>

      {/* ---- 3. SANSKRIT DEVANAGARI (collapsible dropdown) ---- */}
      <div className="devanagari-dropdown">
        <button
          className={`devanagari-dropdown-toggle ${devanagariOpen ? 'open' : ''}`}
          onClick={() => setDevanagariOpen(o => !o)}
        >
          <span className="dropdown-label">Sanskrit Devanagari</span>
          <span className={`dropdown-chevron ${devanagariOpen ? 'open' : ''}`}>&#9662;</span>
        </button>
        {devanagariOpen && (
          <div className="devanagari-dropdown-body">
            <div className="devanagari-block">
              {devanagariLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ---- 4. WORD-BY-WORD interactive breakdown ---- */}
      {words.length > 0 && (
        <div className="word-breakdown-section">
          <h3>Word-by-Word Breakdown</h3>
          <p className="section-hint">Tap any word to see grammar details</p>
          <div className="word-grid">
            {words.map((w) => (
              <button
                key={w.id}
                className="word-chip"
                onClick={() => onWordClick(w)}
              >
                <span className="word-chip-devanagari">{w.word}</span>
                <span className="word-chip-meaning">{w.meaning}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
