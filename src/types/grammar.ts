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
  root_id: string | null
  spiritual_insight: string | null
}

export interface Root {
  id: string
  dhatu: string
  meaning: string
  verb_class: string | null
  pada: string | null
  example_form: string | null
}
