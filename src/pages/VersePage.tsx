import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import type { Verse } from '../types/verse'
import type { Word } from '../types/grammar'
import type { Commentary } from '../types/commentary'
import VerseViewer from '../components/VerseViewer'
import GrammarModal from '../components/GrammarModal'
import ChantMode from '../components/ChantMode'
import GrammarIntroSection from '../components/GrammarIntroSection'
import CommentaryPanel from '../components/CommentaryPanel'
import Flashcard from '../components/Flashcard'
import DevanagariTrainer from '../components/DevanagariTrainer'

export default function VersePage() {
  const { chapter, verse: verseNum } = useParams<{ chapter: string; verse: string }>()
  const [searchParams] = useSearchParams()
  const sourceHint = searchParams.get('source')

  const [verse, setVerse] = useState<Verse | null>(null)
  const [words, setWords] = useState<Word[]>([])
  const [commentaries, setCommentaries] = useState<Commentary[]>([])
  const [selectedWord, setSelectedWord] = useState<Word | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      setSelectedWord(null)

      let query = supabase
        .from('verses')
        .select('*')
        .eq('chapter', Number(chapter))
        .eq('verse', Number(verseNum))

      if (sourceHint) {
        query = query.eq('source_text', sourceHint)
      }

      const { data: verseData, error: verseError } = await query.limit(1).single()

      if (verseError || !verseData) {
        setError('Verse not found.')
        setLoading(false)
        return
      }

      setVerse(verseData)

      const [wordsResult, commentariesResult] = await Promise.all([
        supabase.from('words').select('*').eq('verse_id', verseData.id),
        supabase.from('commentaries').select('*').eq('verse_id', verseData.id),
      ])

      if (wordsResult.data) setWords(wordsResult.data)
      if (commentariesResult.data) setCommentaries(commentariesResult.data)

      setLoading(false)
    }

    fetchData()
  }, [chapter, verseNum, sourceHint])

  if (loading) {
    return <main className="verse-page"><p className="loading">Loading verse...</p></main>
  }

  if (error || !verse) {
    return (
      <main className="verse-page">
        <p className="error">{error || 'Something went wrong.'}</p>
        <Link to="/verses" className="btn">Browse Verses</Link>
      </main>
    )
  }

  return (
    <main className="verse-page">
      <nav className="verse-nav">
        <Link to="/verses" className="back-link">&larr; All Verses</Link>
      </nav>

      {/* 1. Hero Sanskrit (4-line cinematic) + 2. Transliteration + 3. Translation */}
      <VerseViewer verse={verse} words={words} onWordClick={setSelectedWord} />

      {/* Grammar modal (overlay) */}
      {selectedWord && (
        <GrammarModal word={selectedWord} onClose={() => setSelectedWord(null)} />
      )}

      {/* Ornament separator */}
      <div className="ornament-separator">
        <span className="ornament-symbol">&#x0970; &#x0970; &#x0970;</span>
      </div>

      {/* 4. Chant Mode */}
      <ChantMode verse={verse} />

      {/* 5. Understanding Sanskrit Grammar */}
      <GrammarIntroSection />

      {/* Ornament separator */}
      <div className="ornament-separator">
        <span className="ornament-symbol">&#x0970; &#x0970; &#x0970;</span>
      </div>

      {/* 6. Word-by-word breakdown is within VerseViewer (clickable transliteration) */}

      {/* 7. Commentary section */}
      {commentaries.length > 0 && <CommentaryPanel commentaries={commentaries} />}

      {/* 8. Flashcard quiz */}
      {words.length > 0 && <Flashcard words={words} />}

      {/* Devanagari Trainer */}
      <DevanagariTrainer />
    </main>
  )
}
