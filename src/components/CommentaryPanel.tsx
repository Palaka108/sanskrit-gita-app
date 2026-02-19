import { useState } from 'react'
import type { Commentary } from '../types/commentary'

interface CommentaryPanelProps {
  commentaries: Commentary[]
}

export default function CommentaryPanel({ commentaries }: CommentaryPanelProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  function toggle(id: string) {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="commentary-panel">
      <h3>Acharya Commentaries</h3>
      {commentaries.map((c) => (
        <div key={c.id} className="accordion-item">
          <button
            className={`accordion-header ${openId === c.id ? 'open' : ''}`}
            onClick={() => toggle(c.id)}
          >
            <span>{c.acharya}</span>
            <span className="accordion-arrow">{openId === c.id ? '\u25B2' : '\u25BC'}</span>
          </button>
          {openId === c.id && (
            <div className="accordion-body">
              <p>{c.summary}</p>
              {c.key_phrases.length > 0 && (
                <div className="key-phrases">
                  <strong>Key phrases:</strong>
                  <ul>
                    {c.key_phrases.map((phrase, i) => (
                      <li key={i}>{phrase}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </section>
  )
}
