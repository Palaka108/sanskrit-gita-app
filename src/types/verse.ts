export interface Verse {
  id: string
  chapter: number
  verse: number
  devanagari: string
  transliteration: string
  translation: string
  grammar_focus: string | null
  source_text: string | null
}

export type SourceText = 'gita' | 'noi'
