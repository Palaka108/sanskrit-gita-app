import { useState, useCallback } from 'react'
import type { Word } from '../types/grammar'

interface FlashcardProps {
  words: Word[]
}

type QuestionType = 'meaning' | 'case'

interface Question {
  word: Word
  type: QuestionType
  prompt: string
  answer: string
  whyMatters?: string
}

function buildQuestions(words: Word[]): Question[] {
  const questions: Question[] = []
  for (const w of words) {
    questions.push({
      word: w,
      type: 'meaning',
      prompt: `What does "${w.word}" mean?`,
      answer: w.meaning,
      whyMatters: w.spiritual_insight || undefined,
    })
    if (w.grammatical_case || w.tense) {
      questions.push({
        word: w,
        type: 'case',
        prompt: `What is the grammatical form of "${w.word}"?`,
        answer: [w.grammatical_case, w.number, w.tense].filter(Boolean).join(', '),
        whyMatters: w.grammar_note || undefined,
      })
    }
  }
  return questions
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export default function Flashcard({ words }: FlashcardProps) {
  const allQuestions = buildQuestions(words)
  const [deck, setDeck] = useState<Question[]>(() => shuffle(allQuestions).slice(0, 5))
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = deck[index]

  const handleCorrect = useCallback(() => {
    setScore((s) => s + 1)
    setAnswered((a) => a + 1)
    advance()
  }, [index, deck.length])

  const handleIncorrect = useCallback(() => {
    setAnswered((a) => a + 1)
    advance()
  }, [index, deck.length])

  function advance() {
    setRevealed(false)
    if (index + 1 >= deck.length) {
      setFinished(true)
    } else {
      setIndex((i) => i + 1)
    }
  }

  function restart() {
    setDeck(shuffle(allQuestions).slice(0, 5))
    setIndex(0)
    setRevealed(false)
    setScore(0)
    setAnswered(0)
    setFinished(false)
  }

  if (allQuestions.length === 0) {
    return <section className="flashcard"><p>No flashcard data available.</p></section>
  }

  if (finished) {
    return (
      <section className="flashcard">
        <h3>Quiz Complete</h3>
        <p className="quiz-score">{score} / {answered} correct</p>
        <button className="btn" onClick={restart}>Try Again</button>
      </section>
    )
  }

  return (
    <section className="flashcard">
      <h3>Flashcard Quiz ({index + 1} / {deck.length})</h3>
      <div className="flashcard-card">
        <p className="flashcard-prompt">{current.prompt}</p>
        {!revealed ? (
          <button className="btn" onClick={() => setRevealed(true)}>Reveal Answer</button>
        ) : (
          <>
            <p className="flashcard-answer">
              {current.answer}
              {current.whyMatters && (
                <span className="why-matters">{current.whyMatters}</span>
              )}
            </p>
            <div className="flashcard-actions">
              <button className="btn btn-correct" onClick={handleCorrect}>I knew it</button>
              <button className="btn btn-incorrect" onClick={handleIncorrect}>I didn't know</button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
