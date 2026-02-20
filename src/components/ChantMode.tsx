import type { Verse } from '../types/verse'

interface ChantModeProps {
  verse: Verse
}

/**
 * Split Devanagari into lines for chant display.
 * Same logic as VerseViewer to guarantee 4-line rendering for BG 18.66.
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

export default function ChantMode({ verse }: ChantModeProps) {
  const lines = splitDevanagari(verse.devanagari)

  return (
    <section className="chant-mode">
      <h3>Chant Mode</h3>

      <div className="chant-display">
        {lines.map((line, i) => (
          <p key={i} className="chant-line">{line}</p>
        ))}
      </div>

      <p className="chant-transliteration">{verse.transliteration}</p>

      <div className="chant-placeholder">
        <p>Audio playback coming in a future version.</p>
      </div>
    </section>
  )
}
