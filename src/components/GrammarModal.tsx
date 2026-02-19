import type { Word } from '../types/grammar'

interface GrammarModalProps {
  word: Word
  onClose: () => void
}

export default function GrammarModal({ word, onClose }: GrammarModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3>{word.word}</h3>
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
                <td className="grammar-label">Tense/Mood</td>
                <td>{word.tense}</td>
              </tr>
            )}
            <tr>
              <td className="grammar-label">Meaning</td>
              <td>{word.meaning}</td>
            </tr>
          </tbody>
        </table>
        {word.grammar_note && (
          <div className="grammar-note">
            <p>{word.grammar_note}</p>
          </div>
        )}
      </div>
    </div>
  )
}
