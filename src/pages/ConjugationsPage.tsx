import { useState } from 'react'

type TabId = 'nouns' | 'verbs' | 'concepts'

export default function ConjugationsPage() {
  const [tab, setTab] = useState<TabId>('nouns')

  return (
    <main className="conjugations-page fade-in">
      <h1>Sanskrit Grammar Explorer</h1>
      <p className="conjugations-subtitle">
        Beginner-friendly tables and explanations — no linguistic background needed
      </p>

      <div className="conj-tabs">
        <button className={`conj-tab ${tab === 'nouns' ? 'active' : ''}`} onClick={() => setTab('nouns')}>
          Noun Declensions
        </button>
        <button className={`conj-tab ${tab === 'verbs' ? 'active' : ''}`} onClick={() => setTab('verbs')}>
          Verb Conjugations
        </button>
        <button className={`conj-tab ${tab === 'concepts' ? 'active' : ''}`} onClick={() => setTab('concepts')}>
          Key Concepts
        </button>
      </div>

      {tab === 'nouns' && <NounSection />}
      {tab === 'verbs' && <VerbSection />}
      {tab === 'concepts' && <ConceptsSection />}
    </main>
  )
}

/* ---- NOUN DECLENSION TABLE ---- */

function NounSection() {
  return (
    <section className="conj-section fade-in">
      <h2>Noun Declension: Kṛṣṇa (masculine, a-stem)</h2>
      <p className="conj-note">
        In Sanskrit, nouns change their ending depending on their role in the sentence.
        This is called "declension." Below is how the name Kṛṣṇa changes across all eight cases.
      </p>

      <div className="table-scroll">
        <table className="conj-table">
          <thead>
            <tr>
              <th>Case</th>
              <th>Singular</th>
              <th>Dual</th>
              <th>Plural</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="case-label">Nominative</td>
              <td>Kṛṣṇaḥ</td>
              <td>Kṛṣṇau</td>
              <td>Kṛṣṇāḥ</td>
              <td className="case-usage">The doer — "Kṛṣṇa speaks"</td>
            </tr>
            <tr>
              <td className="case-label">Accusative</td>
              <td>Kṛṣṇam</td>
              <td>Kṛṣṇau</td>
              <td>Kṛṣṇān</td>
              <td className="case-usage">The receiver — "I see Kṛṣṇa"</td>
            </tr>
            <tr>
              <td className="case-label">Instrumental</td>
              <td>Kṛṣṇena</td>
              <td>Kṛṣṇābhyām</td>
              <td>Kṛṣṇaiḥ</td>
              <td className="case-usage">By/with — "with Kṛṣṇa"</td>
            </tr>
            <tr>
              <td className="case-label">Dative</td>
              <td>Kṛṣṇāya</td>
              <td>Kṛṣṇābhyām</td>
              <td>Kṛṣṇebhyaḥ</td>
              <td className="case-usage">For/to — "for Kṛṣṇa"</td>
            </tr>
            <tr>
              <td className="case-label">Ablative</td>
              <td>Kṛṣṇāt</td>
              <td>Kṛṣṇābhyām</td>
              <td>Kṛṣṇebhyaḥ</td>
              <td className="case-usage">From — "from Kṛṣṇa"</td>
            </tr>
            <tr>
              <td className="case-label">Genitive</td>
              <td>Kṛṣṇasya</td>
              <td>Kṛṣṇayoḥ</td>
              <td>Kṛṣṇānām</td>
              <td className="case-usage">Of/belonging to — "of Kṛṣṇa"</td>
            </tr>
            <tr>
              <td className="case-label">Locative</td>
              <td>Kṛṣṇe</td>
              <td>Kṛṣṇayoḥ</td>
              <td>Kṛṣṇeṣu</td>
              <td className="case-usage">In/on — "in Kṛṣṇa"</td>
            </tr>
            <tr>
              <td className="case-label">Vocative</td>
              <td>Kṛṣṇa!</td>
              <td>Kṛṣṇau!</td>
              <td>Kṛṣṇāḥ!</td>
              <td className="case-usage">Calling — "O Kṛṣṇa!"</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

/* ---- VERB CONJUGATION TABLE ---- */

function VerbSection() {
  return (
    <section className="conj-section fade-in">
      <h2>Verb Conjugation: √bhū (to be / to become)</h2>
      <p className="conj-note">
        Sanskrit verbs change based on who is doing the action (person) and how many (number).
        The root √bhū is one of the most common verbs. Below are its present tense forms.
      </p>

      <h3 className="conj-sub-heading">Present Tense (Laṭ Lakāra)</h3>
      <div className="table-scroll">
        <table className="conj-table">
          <thead>
            <tr>
              <th>Person</th>
              <th>Singular</th>
              <th>Dual</th>
              <th>Plural</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="case-label">3rd Person (he/she/it)</td>
              <td>bhavati</td>
              <td>bhavataḥ</td>
              <td>bhavanti</td>
            </tr>
            <tr>
              <td className="case-label">2nd Person (you)</td>
              <td>bhavasi</td>
              <td>bhavathaḥ</td>
              <td>bhavatha</td>
            </tr>
            <tr>
              <td className="case-label">1st Person (I/we)</td>
              <td>bhavāmi</td>
              <td>bhavāvaḥ</td>
              <td>bhavāmaḥ</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="conj-sub-heading">Imperative (Loṭ Lakāra)</h3>
      <div className="table-scroll">
        <table className="conj-table">
          <thead>
            <tr>
              <th>Person</th>
              <th>Singular</th>
              <th>Dual</th>
              <th>Plural</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="case-label">3rd Person</td>
              <td>bhavatu</td>
              <td>bhavatām</td>
              <td>bhavantu</td>
            </tr>
            <tr>
              <td className="case-label">2nd Person</td>
              <td>bhava</td>
              <td>bhavatam</td>
              <td>bhavata</td>
            </tr>
            <tr>
              <td className="case-label">1st Person</td>
              <td>bhavāni</td>
              <td>bhavāva</td>
              <td>bhavāma</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="conj-sub-heading">Future Tense (Lṛṭ Lakāra)</h3>
      <div className="table-scroll">
        <table className="conj-table">
          <thead>
            <tr>
              <th>Person</th>
              <th>Singular</th>
              <th>Dual</th>
              <th>Plural</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="case-label">3rd Person</td>
              <td>bhaviṣyati</td>
              <td>bhaviṣyataḥ</td>
              <td>bhaviṣyanti</td>
            </tr>
            <tr>
              <td className="case-label">2nd Person</td>
              <td>bhaviṣyasi</td>
              <td>bhaviṣyathaḥ</td>
              <td>bhaviṣyatha</td>
            </tr>
            <tr>
              <td className="case-label">1st Person</td>
              <td>bhaviṣyāmi</td>
              <td>bhaviṣyāvaḥ</td>
              <td>bhaviṣyāmaḥ</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="conj-extra-info glass-card">
        <h4>Past Participle</h4>
        <p><strong>bhūta</strong> — "that which has become" or "having been." You see this in the word "bhūta" meaning a living being (one who has come into existence).</p>
      </div>
    </section>
  )
}

/* ---- KEY CONCEPTS SECTION ---- */

function ConceptsSection() {
  const concepts = [
    {
      title: '1st Person',
      explanation: 'First person means "I" or "we." The speaker is talking about themselves. When you see a 1st-person verb, the speaker is the one doing the action.',
    },
    {
      title: '2nd Person',
      explanation: 'Second person means "you." The speaker is addressing someone directly. In the Gita, Krishna often uses 2nd person when speaking to Arjuna.',
    },
    {
      title: '3rd Person',
      explanation: 'Third person means "he," "she," "it," or "they." The speaker is talking about someone else. Most narrative descriptions use 3rd person.',
    },
    {
      title: 'Masculine / Feminine / Neuter',
      explanation: 'Every Sanskrit noun has a grammatical gender. This affects which endings the word takes. "Dharma" is masculine, "vidyā" is feminine, "jñāna" (knowledge) is neuter.',
    },
    {
      title: 'Past Participle',
      explanation: 'A past participle describes a completed action, like "spoken," "done," or "abandoned" in English. In Sanskrit, these often end in -ta or -na. Example: kṛta = done.',
    },
    {
      title: 'Imperative',
      explanation: 'The imperative is a command form — someone is directly telling someone else to do something. "vraja" (surrender!) in BG 18.66 is imperative. It carries authority.',
    },
    {
      title: 'Future Tense',
      explanation: 'Future tense means "I will do" or "it will happen." In BG 18.66, "mokṣayiṣyāmi" (I will liberate) is future tense — Krishna making a personal promise.',
    },
  ]

  return (
    <section className="conj-section fade-in">
      <h2>Key Grammar Concepts</h2>
      <p className="conj-note">
        Quick reference for the grammatical terms you'll encounter in verse analysis. Each explanation is beginner-friendly.
      </p>

      <div className="concepts-grid">
        {concepts.map((c, i) => (
          <div key={i} className="concept-card glass-card">
            <h3>{c.title}</h3>
            <p>{c.explanation}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
