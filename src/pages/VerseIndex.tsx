import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import type { Verse } from '../types/verse'

type FilterMode = 'all' | 'gita' | 'noi'

const GRAMMAR_CONCEPTS = [
  'present tense verbs',
  'compound nouns (samāsa)',
  'instrumental case',
  'nominative masculine',
  'dative case',
  'imperative verbs',
  'accusative singular',
  'genitive plural',
  'pronouns + indeclinables',
  'particles (eva, ca)',
  'present participle',
  'past passive participle',
  'compound + genitive',
  'verb root recognition',
  'locative case',
  'indeclinable usage',
  'causative future tense',
]

function verseLabel(v: Verse): string {
  if (v.source_text === 'noi') return `NOI ${v.verse}`
  return `BG ${v.chapter}.${v.verse}`
}

function verseSortKey(v: Verse): number {
  if (v.source_text === 'noi') return 100 + v.verse
  return v.chapter * 100 + v.verse
}

export default function VerseIndex() {
  const [verses, setVerses] = useState<Verse[]>([])
  const [loading, setLoading] = useState(true)
  const [textFilter, setTextFilter] = useState<FilterMode>('all')
  const [grammarFilter, setGrammarFilter] = useState<string>('')

  useEffect(() => {
    async function fetchVerses() {
      const { data } = await supabase.from('verses').select('*')
      if (data) {
        const sorted = data.sort((a: Verse, b: Verse) => verseSortKey(a) - verseSortKey(b))
        setVerses(sorted)
      }
      setLoading(false)
    }
    fetchVerses()
  }, [])

  const filtered = verses.filter((v) => {
    if (textFilter === 'gita' && v.source_text !== 'gita') return false
    if (textFilter === 'noi' && v.source_text !== 'noi') return false
    if (grammarFilter && v.grammar_focus !== grammarFilter) return false
    return true
  })

  const gitaChapters = [...new Set(
    verses.filter((v) => v.source_text === 'gita').map((v) => v.chapter)
  )].sort((a, b) => a - b)

  return (
    <main className="verse-index-page">
      <h1>Verse Library</h1>
      <p className="index-subtitle">{verses.length} verses with grammar analysis</p>

      <div className="filter-bar">
        <div className="filter-group">
          <label>Text</label>
          <div className="filter-pills">
            <button className={`pill ${textFilter === 'all' ? 'active' : ''}`} onClick={() => setTextFilter('all')}>All</button>
            <button className={`pill ${textFilter === 'gita' ? 'active' : ''}`} onClick={() => setTextFilter('gita')}>Bhagavad-gita</button>
            <button className={`pill ${textFilter === 'noi' ? 'active' : ''}`} onClick={() => setTextFilter('noi')}>Nectar of Instruction</button>
          </div>
        </div>
        <div className="filter-group">
          <label>Grammar Focus</label>
          <select
            className="filter-select"
            value={grammarFilter}
            onChange={(e) => setGrammarFilter(e.target.value)}
          >
            <option value="">All concepts</option>
            {GRAMMAR_CONCEPTS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="loading">Loading verses...</p>
      ) : filtered.length === 0 ? (
        <p className="loading">No verses match the current filters.</p>
      ) : (
        <>
          {textFilter !== 'noi' && gitaChapters.map((ch) => {
            const chVerses = filtered.filter((v) => v.source_text === 'gita' && v.chapter === ch)
            if (chVerses.length === 0) return null
            return (
              <div key={`ch-${ch}`} className="chapter-group">
                <h2 className="chapter-heading">Chapter {ch}</h2>
                <div className="verse-grid">
                  {chVerses.map((v) => (
                    <Link key={v.id} to={`/verse/${v.chapter}/${v.verse}`} className="verse-card-link">
                      <div className="verse-index-card">
                        <span className="card-ref">{verseLabel(v)}</span>
                        {v.grammar_focus && <span className="card-grammar">{v.grammar_focus}</span>}
                        <p className="card-preview">{v.translation.slice(0, 80)}...</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}

          {textFilter !== 'gita' && (() => {
            const noiVerses = filtered.filter((v) => v.source_text === 'noi')
            if (noiVerses.length === 0) return null
            return (
              <div className="chapter-group">
                <h2 className="chapter-heading">Nectar of Instruction</h2>
                <div className="verse-grid">
                  {noiVerses.map((v) => (
                    <Link key={v.id} to={`/verse/${v.chapter}/${v.verse}?source=noi`} className="verse-card-link">
                      <div className="verse-index-card">
                        <span className="card-ref">{verseLabel(v)}</span>
                        {v.grammar_focus && <span className="card-grammar">{v.grammar_focus}</span>}
                        <p className="card-preview">{v.translation.slice(0, 80)}...</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })()}
        </>
      )}
    </main>
  )
}
