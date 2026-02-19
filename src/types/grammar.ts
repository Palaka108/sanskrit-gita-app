export interface Word {
  id: string
  verse_id: string
  word: string
  root: string | null
  grammatical_case: string | null
  number: string | null
  tense: string | null
  meaning: string
  grammar_note: string | null
}
