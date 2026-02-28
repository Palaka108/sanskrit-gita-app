import { useState, useMemo } from 'react'
import type { Word } from '../types/grammar'

interface GrammarConcept {
  term: string
  sanskrit?: string
  explanation: string
  verseExample?: string
}

interface GrammarIntroSectionProps {
  words: Word[]
}

/**
 * Build grammar concepts dynamically from the verse's word data.
 * Each concept only appears if relevant words exist in this verse.
 */
function buildConcepts(words: Word[]): GrammarConcept[] {
  const concepts: GrammarConcept[] = []

  // 1. Verb Root (Dhatu) — words that have a root
  const wordsWithRoot = words.filter(w => w.root)
  if (wordsWithRoot.length > 0) {
    const examples = wordsWithRoot
      .map(w => `"${w.word}" comes from the root "${w.root}" — meaning "${w.meaning}"`)
      .join('. ')
    concepts.push({
      term: 'Verb Root (Dhatu)',
      sanskrit: 'धातु',
      explanation:
        'A verb root is the most basic form of a verb — the seed from which different verb forms grow. In English, think of "go" as a root that becomes "goes", "going", "went". In Sanskrit, verb roots (dhātu) transform through prefixes, suffixes, and endings.',
      verseExample: `In this verse: ${examples}.`,
    })
  }

  // 2. Grammatical Case — words that have a case
  const wordsWithCase = words.filter(w => w.grammatical_case)
  if (wordsWithCase.length > 0) {
    const caseExamples = wordsWithCase
      .map(w => `"${w.word}" is ${w.grammatical_case} — "${w.meaning}"`)
      .join('. ')
    concepts.push({
      term: 'Grammatical Case',
      sanskrit: 'विभक्ति',
      explanation:
        'A case tells you the role a word plays in a sentence — is it the doer, the receiver, or something else? English uses word order ("The dog bit the man" vs "The man bit the dog"). Sanskrit uses case endings instead, so word order is flexible.',
      verseExample: `In this verse: ${caseExamples}.`,
    })
  }

  // 3. Tense — words that have a tense
  const wordsWithTense = words.filter(w => w.tense)
  if (wordsWithTense.length > 0) {
    // Group by tense type for cleaner display
    const tenseMap = new Map<string, Word[]>()
    for (const w of wordsWithTense) {
      const key = w.tense!.toLowerCase()
      if (!tenseMap.has(key)) tenseMap.set(key, [])
      tenseMap.get(key)!.push(w)
    }

    for (const [tense, tenseWords] of tenseMap) {
      const examples = tenseWords
        .map(w => `"${w.word}" — "${w.meaning}"`)
        .join(', ')

      let termName = tense.charAt(0).toUpperCase() + tense.slice(1)
      let sanskrit: string | undefined
      let explanation: string

      if (tense.includes('imperative')) {
        termName = 'Imperative'
        sanskrit = 'लोट्'
        explanation =
          'The imperative is a command form. It means someone is directly telling someone else to do something — a direct instruction carrying authority.'
      } else if (tense.includes('future')) {
        termName = 'Future Tense'
        sanskrit = 'लृट्'
        explanation =
          'Future tense means "I will do" or "it will happen." It describes an action that has not happened yet but is promised or expected.'
      } else if (tense.includes('present')) {
        termName = 'Present Tense'
        sanskrit = 'लट्'
        explanation =
          'Present tense describes an action happening now or a general truth. In Sanskrit, the present tense (laṭ) shows ongoing or habitual action.'
      } else if (tense.includes('past') || tense.includes('perfect')) {
        termName = 'Past Tense'
        sanskrit = 'लिट् / लङ्'
        explanation =
          'Past tense describes an action that has already happened. Sanskrit has several past tenses for different types of past action.'
      } else if (tense.includes('participle')) {
        termName = 'Participle'
        sanskrit = 'क्त / क्तवतु'
        explanation =
          'A participle describes an action that has been completed, often used like an adjective. In English: "abandoned", "spoken", "done". In Sanskrit, these forms often end in -ta or -na.'
      } else {
        explanation = `This verb form (${tense}) describes a specific type of action or mood in Sanskrit grammar.`
      }

      concepts.push({
        term: termName,
        sanskrit,
        explanation,
        verseExample: `In this verse: ${examples}.`,
      })
    }
  }

  // 4. Grammar notes — words with rich grammar_note (compound analysis, etc.)
  const wordsWithCompounds = words.filter(
    w => w.grammar_note && (w.grammar_note.includes('compound') || w.grammar_note.includes('Compound'))
  )
  if (wordsWithCompounds.length > 0) {
    const examples = wordsWithCompounds
      .map(w => `"${w.word}" — ${w.grammar_note}`)
      .join('. ')
    concepts.push({
      term: 'Sanskrit Compounds',
      sanskrit: 'समास',
      explanation:
        'Sanskrit loves combining words into compounds — sometimes two, three, or even four words merge into one. Understanding the compound type helps you break down long words into their meaningful parts.',
      verseExample: `In this verse: ${examples}.`,
    })
  }

  // 5. Spiritual insight summary (if any words have spiritual_insight)
  const wordsWithInsight = words.filter(w => w.spiritual_insight)
  if (wordsWithInsight.length > 0) {
    const insights = wordsWithInsight
      .map(w => `"${w.word}": ${w.spiritual_insight}`)
      .join(' • ')
    concepts.push({
      term: 'Spiritual Insights',
      sanskrit: 'अध्यात्म',
      explanation:
        'Beyond grammar, each Sanskrit word carries spiritual depth. The ācāryas reveal how word meanings point to deeper truths about the soul, God, and devotion.',
      verseExample: insights,
    })
  }

  return concepts
}

export default function GrammarIntroSection({ words }: GrammarIntroSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const concepts = useMemo(() => buildConcepts(words), [words])

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (concepts.length === 0) return null

  return (
    <section className="grammar-intro">
      <h3>Understanding Sanskrit Grammar</h3>
      <p className="intro-subtitle">Beginner Friendly — No linguistic background needed</p>

      {/* Ornament separator */}
      <div className="ornament-separator">
        <span className="ornament-symbol">&#x0970; &#x0970; &#x0970;</span>
      </div>

      <div className="grammar-intro-grid">
        {concepts.map((concept, i) => (
          <div key={i} className="grammar-intro-item">
            <button className="grammar-intro-header" onClick={() => toggle(i)}>
              <span>
                {concept.term}
                {concept.sanskrit && (
                  <span className="term-sanskrit"> {concept.sanskrit}</span>
                )}
              </span>
              <span className={`expand-icon ${openIndex === i ? 'open' : ''}`}>
                &#x25BC;
              </span>
            </button>
            {openIndex === i && (
              <div className="grammar-intro-body">
                <p>{concept.explanation}</p>
                {concept.verseExample && (
                  <div className="verse-example">
                    {concept.verseExample}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
