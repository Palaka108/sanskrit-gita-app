import type { Word } from '../types/grammar'

interface GrammarModalProps {
  word: Word
  onClose: () => void
}

/**
 * Generate a plain-English explanation based on the word's grammar properties.
 */
function getPlainExplanation(word: Word): string | null {
  const parts: string[] = []

  if (word.tense) {
    const tLower = word.tense.toLowerCase()
    if (tLower.includes('imperative')) {
      parts.push('This is a command form — someone is directly telling someone else to do something.')
    } else if (tLower.includes('future')) {
      parts.push('This is future tense — it describes something that will happen.')
    } else if (tLower.includes('present')) {
      parts.push('This is present tense — it describes an action happening now.')
    } else if (tLower.includes('past') || tLower.includes('participle')) {
      parts.push('This is a past form — it describes an action that has already been done.')
    }
  }

  if (word.grammatical_case) {
    const cLower = word.grammatical_case.toLowerCase()
    if (cLower.includes('accusative')) {
      parts.push('The accusative case means this word is the object — the one receiving the action.')
    } else if (cLower.includes('nominative')) {
      parts.push('The nominative case means this word is the subject — the one doing the action.')
    } else if (cLower.includes('instrumental')) {
      parts.push('The instrumental case means "by" or "with" — it tells how the action is done.')
    } else if (cLower.includes('dative')) {
      parts.push('The dative case means "to" or "for" — it tells who benefits from the action.')
    } else if (cLower.includes('ablative')) {
      parts.push('The ablative case means "from" — it shows the source or origin.')
    } else if (cLower.includes('genitive')) {
      parts.push('The genitive case means "of" — it shows possession or belonging.')
    } else if (cLower.includes('locative')) {
      parts.push('The locative case means "in" or "at" — it tells where something happens.')
    } else if (cLower.includes('vocative')) {
      parts.push('The vocative case is used for direct address — calling out to someone.')
    }
  }

  if (word.root) {
    parts.push(`This word comes from the root "${word.root}".`)
  }

  return parts.length > 0 ? parts.join(' ') : null
}

export default function GrammarModal({ word, onClose }: GrammarModalProps) {
  const explanation = getPlainExplanation(word)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>

        {/* Word in Devanagari (large) */}
        <div className="modal-devanagari">{word.word}</div>

        {/* Transliteration */}
        <div className="modal-transliteration">{word.word}</div>

        {/* Gold accent divider */}
        <div className="modal-divider" />

        {/* Grammar details table */}
        <table className="grammar-table">
          <tbody>
            {word.root && (
              <tr>
                <td className="grammar-label">Root</td>
                <td>{word.root}</td>
              </tr>
            )}
            {word.grammatical_case && (
              <tr>
                <td className="grammar-label">Case</td>
                <td>{word.grammatical_case}</td>
              </tr>
            )}
            {word.number && (
              <tr>
                <td className="grammar-label">Number</td>
                <td>{word.number}</td>
              </tr>
            )}
            {word.tense && (
              <tr>
                <td className="grammar-label">Tense / Mood</td>
                <td>{word.tense}</td>
              </tr>
            )}
            <tr>
              <td className="grammar-label">Meaning</td>
              <td>{word.meaning}</td>
            </tr>
          </tbody>
        </table>

        {/* Plain English explanation */}
        {explanation && (
          <div className="modal-explanation">
            <p className="explanation-label">Plain English</p>
            <p>{explanation}</p>
          </div>
        )}

        {/* Grammar note */}
        {word.grammar_note && (
          <div className="grammar-note">
            <p>{word.grammar_note}</p>
          </div>
        )}

        {/* Why this matters spiritually */}
        {word.spiritual_insight && (
          <div className="spiritual-insight">
            <p className="insight-label">Why This Matters Spiritually</p>
            <p>{word.spiritual_insight}</p>
          </div>
        )}
      </div>
    </div>
  )
}
