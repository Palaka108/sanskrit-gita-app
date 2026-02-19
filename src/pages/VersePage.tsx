import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import type { Verse } from '../types/verse'
import type { Word } from '../types/grammar'
import type { Commentary } from '../types/commentary'
import VerseViewer from '../components/VerseViewer'
import GrammarModal from '../components/GrammarModal'
import CommentaryPanel from '../components/CommentaryPanel'
import ChantMode from '../components/ChantMode'
import Flashcard from '../components/Flashcard'
import DevanagariTrainer from '../components/DevanagariTrainer'

export default function VersePage() {
  const { chapter, verse: verseNum } = useParams<{ chapter: string; verse: string }>()
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

      const { data: verseData, error: verseError } = await supabase
        .from('verses')
        .select('*')
        .eq('chapter', Number(chapter))
        .eq('verse', Number(verseNum))
        .single()

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
  }, [chapter, verseNum])

  if (loading) {
    return <main className="verse-page"><p className="loading">Loading verse...</p></main>
  }

  if (error || !verse) {
    return (
      <main className="verse-page">
        <p className="error">{error || 'Something went wrong.'}</p>
        <Link to="/" className="btn">Back to Home</Link>
      </main>
    )
  }

  return (
    <main className="verse-page">
      <Link to="/" className="back-link">Back to Home</Link>

      <VerseViewer verse={verse} words={words} onWordClick={setSelectedWord} />

      {selectedWord && (
        <GrammarModal word={selectedWord} onClose={() => setSelectedWord(null)} />
      )}

      <CommentaryPanel commentaries={commentaries} />
      <ChantMode verse={verse} />
      <Flashcard words={words} />
      <DevanagariTrainer />
    </main>
  )
}
