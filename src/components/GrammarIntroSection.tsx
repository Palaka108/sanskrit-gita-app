import { useState } from 'react'

interface GrammarConcept {
  term: string
  sanskrit?: string
  explanation: string
  verseExample?: string
}

const GRAMMAR_CONCEPTS: GrammarConcept[] = [
  {
    term: 'Verb Root (Dhatu)',
    sanskrit: 'धातु',
    explanation:
      'A verb root is the most basic form of a verb — the seed from which different verb forms grow. In English, think of "go" as a root that becomes "goes", "going", "went". In Sanskrit, "muc" (to release) is the root behind "moksayisyami" (I will release).',
    verseExample:
      'In this verse, "tyaj" (to abandon) is the root behind "parityajya" (having abandoned).',
  },
  {
    term: 'Grammatical Case',
    sanskrit: 'विभक्ति',
    explanation:
      'A case tells you the role a word plays in a sentence — is it the doer, the receiver, or something else? English uses word order ("The dog bit the man" vs "The man bit the dog"). Sanskrit uses case endings instead, so word order is flexible.',
    verseExample:
      '"mam" is in the accusative case, meaning it is the object — the one receiving the action. Krishna is saying "come to Me" — He is the destination.',
  },
  {
    term: '1st Person',
    explanation:
      'First person means "I" or "we" — the speaker is talking about themselves. When you see a 1st-person verb, the speaker is the one doing the action.',
    verseExample:
      '"moksayisyami" is 1st person — Krishna Himself is saying "I will release you." He is personally making this promise.',
  },
  {
    term: '2nd Person',
    explanation:
      'Second person means "you" — the speaker is addressing someone directly. When you see a 2nd-person verb or pronoun, someone is being spoken to.',
    verseExample:
      '"tvam" (you) is 2nd person — Krishna is directly addressing Arjuna. "vraja" (go/surrender) is also 2nd person — a direct instruction to Arjuna.',
  },
  {
    term: 'Masculine / Feminine / Neuter',
    explanation:
      'In Sanskrit, every noun has a gender — masculine, feminine, or neuter. This is a grammatical property, not always about actual gender. The gender affects which endings the word takes.',
    verseExample:
      '"dharma" is masculine. "sarana" (shelter) is neuter. The endings change depending on gender and case.',
  },
  {
    term: 'Past Participle',
    sanskrit: 'क्त / क्तवतु',
    explanation:
      'A past participle describes an action that has already been completed. In English: "abandoned", "spoken", "done". In Sanskrit, these forms often end in -ta or -na.',
    verseExample:
      '"parityajya" uses a related form — it means "having abandoned." The action of abandoning comes first, then the next action follows.',
  },
  {
    term: 'Imperative',
    sanskrit: 'लोट्',
    explanation:
      'The imperative is a command form. It means someone is directly telling someone else to do something. No "please" or "maybe" — it is a direct instruction.',
    verseExample:
      '"vraja" (surrender / go) is imperative — Krishna is directly commanding Arjuna: "Surrender unto Me!" It carries authority and urgency.',
  },
  {
    term: 'Future Tense',
    sanskrit: 'लृट्',
    explanation:
      'Future tense means "I will do" or "it will happen." It describes an action that has not happened yet but is promised or expected.',
    verseExample:
      '"moksayisyami" is future tense — "I will liberate." Krishna is making a personal promise about what He will do. This is not a hope — it is a divine guarantee.',
  },
]

export default function GrammarIntroSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="grammar-intro">
      <h3>Understanding Sanskrit Grammar</h3>
      <p className="intro-subtitle">Beginner Friendly — No linguistic background needed</p>

      {/* Ornament separator */}
      <div className="ornament-separator">
        <span className="ornament-symbol">&#x0970; &#x0970; &#x0970;</span>
      </div>

      <div className="grammar-intro-grid">
        {GRAMMAR_CONCEPTS.map((concept, i) => (
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
