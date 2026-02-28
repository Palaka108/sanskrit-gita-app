import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import type { Verse } from '../types/verse'
import type { Word } from '../types/grammar'
import type { Commentary } from '../types/commentary'
import VerseViewer from '../components/VerseViewer'
import GrammarModal from '../components/GrammarModal'
import AudioButtons from '../components/AudioButtons'
import GrammarIntroSection from '../components/GrammarIntroSection'
import CommentaryPanel from '../components/CommentaryPanel'
import Flashcard from '../components/Flashcard'
import VerseNav from '../components/VerseNav'

const NATURE_SCENES = [
  '/videos/meditation-intro.mp4',
  '/videos/nature-lotus-pond.mp4',
  '/videos/nature-forest.mp4',
  '/videos/nature-sunset.mp4',
]

export default function VersePage() {
  const { chapter, verse: verseNum } = useParams<{ chapter: string; verse: string }>()
  const [searchParams] = useSearchParams()
  const sourceHint = searchParams.get('source')

  const [videoSrc] = useState(
    () => NATURE_SCENES[Math.floor(Math.random() * NATURE_SCENES.length)]
  )
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
      </main>
    )
  }

  return (
    <main className="verse-page">
      {/* Nature video background — randomly selected per visit */}
      <div className="water-bg" aria-hidden="true">
        <video
          key={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="water-video"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Dark overlay to keep text readable */}
        <div className="water-overlay"></div>
        {/* Subtle warm glow center */}
        <div className="water-glow"></div>
      </div>

      {/* Section navigation — Home + jump to sections */}
      <VerseNav hasWords={words.length > 0} hasCommentaries={commentaries.length > 0} />

      {/* 1. GITA VIBE — audio player */}
      <AudioButtons verseId={verse.id} chapter={verse.chapter} verse={verse.verse} />

      {/* 2. Verse content: transliteration, translation, devanagari dropdown, word breakdown */}
      <VerseViewer verse={verse} words={words} onWordClick={setSelectedWord} />

      {/* Grammar modal (overlay) */}
      {selectedWord && (
        <GrammarModal word={selectedWord} onClose={() => setSelectedWord(null)} />
      )}

      {/* 3. Grammar Focus section — built from this verse's word data */}
      <div id="section-grammar">
        <GrammarIntroSection words={words} />
      </div>

      {/* Ornament separator */}
      <div className="ornament-separator">
        <span className="ornament-symbol">&#x0970; &#x0970; &#x0970;</span>
      </div>

      {/* 4. Commentary section */}
      {commentaries.length > 0 && (
        <div id="section-acaryas">
          <CommentaryPanel commentaries={commentaries} />
        </div>
      )}

      {/* Flashcard quiz */}
      {words.length > 0 && (
        <div id="section-flashcard">
          <Flashcard words={words} />
        </div>
      )}
    </main>
  )
}
