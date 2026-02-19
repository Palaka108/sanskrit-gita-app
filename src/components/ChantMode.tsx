import type { Verse } from '../types/verse'

interface ChantModeProps {
  verse: Verse
}

export default function ChantMode({ verse }: ChantModeProps) {
  return (
    <section className="chant-mode">
      <h3>Chant Mode</h3>
      <div className="chant-display">
        {verse.devanagari.split('\n').map((line, i) => (
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
