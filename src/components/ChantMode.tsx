import type { Verse } from '../types/verse'

interface ChantModeProps {
  verse: Verse
}

/**
 * Split the ROMAN TRANSLITERATION into 4 lines for chant display.
 * Same logic as VerseViewer.
 */
function splitTransliterationIntoLines(text: string): string[] {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  if (lines.length >= 2) return lines

  const words = text.split(/\s+/).filter(Boolean)
  if (words.length <= 4) return [text]

  const perLine = Math.ceil(words.length / 4)
  const result: string[] = []
  for (let i = 0; i < words.length; i += perLine) {
    result.push(words.slice(i, i + perLine).join(' '))
  }
  return result
}

export default function ChantMode({ verse }: ChantModeProps) {
  // Devanagari: render as-is from DB
  const devanagariLines = verse.devanagari.split('\n').filter(Boolean)
  // Transliteration: always 4 lines
  const translitLines = splitTransliterationIntoLines(verse.transliteration)

  return (
    <section className="chant-mode">
      <h3>Chant Mode</h3>

      <div className="chant-display">
        {/* Devanagari — as-is from DB */}
        {devanagariLines.map((line, i) => (
          <p key={i} className="chant-line">{line}</p>
        ))}
      </div>

      {/* Transliteration — 4 lines */}
      <div className="chant-transliteration">
        {translitLines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>

      <div className="chant-placeholder">
        <p>Audio playback coming in a future version.</p>
      </div>
    </section>
  )
}
