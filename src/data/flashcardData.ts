export interface FlashcardItem {
  devanagari: string
  transliteration: string
  caseLabel: string
  numberLabel: string
  english: string
  explanation: string
}

export interface FlashcardCategory {
  id: string
  title: string
  subtitle: string
  baseWord: string
  baseTranslit: string
  cards: FlashcardItem[]
}

const CASE_NAMES = [
  'Nominative',
  'Accusative',
  'Instrumental',
  'Dative',
  'Ablative',
  'Genitive',
  'Locative',
  'Vocative',
] as const

const CASE_ENGLISH: Record<string, Record<string, string>> = {
  Nominative: { fn: 'Subject', desc: 'The subject or doer of the action' },
  Accusative: { fn: 'Object', desc: 'The direct object receiving the action' },
  Instrumental: { fn: 'By / With', desc: 'The instrument or means of the action' },
  Dative: { fn: 'To / For', desc: 'The indirect object or purpose' },
  Ablative: { fn: 'From', desc: 'The source, origin, or separation' },
  Genitive: { fn: 'Of / Belonging to', desc: 'Possession or relation' },
  Locative: { fn: 'In / On / At', desc: 'The location or circumstance' },
  Vocative: { fn: 'O! (address)', desc: 'Direct address or calling' },
}

const NUMBERS = ['Singular', 'Dual', 'Plural'] as const

// ─── Masculine a-stem: कृष्ण (Kṛṣṇa) ───

const krishnaDeclension: [string, string, string][] = [
  // [singular, dual, plural] per case
  ['कृष्णः', 'कृष्णौ', 'कृष्णाः'],       // Nom
  ['कृष्णम्', 'कृष्णौ', 'कृष्णान्'],      // Acc
  ['कृष्णेन', 'कृष्णाभ्याम्', 'कृष्णैः'],   // Ins
  ['कृष्णाय', 'कृष्णाभ्याम्', 'कृष्णेभ्यः'], // Dat
  ['कृष्णात्', 'कृष्णाभ्याम्', 'कृष्णेभ्यः'], // Abl
  ['कृष्णस्य', 'कृष्णयोः', 'कृष्णानाम्'],   // Gen
  ['कृष्णे', 'कृष्णयोः', 'कृष्णेषु'],      // Loc
  ['हे कृष्ण', 'हे कृष्णौ', 'हे कृष्णाः'],   // Voc
]

const krishnaTranslit: [string, string, string][] = [
  ['kṛṣṇaḥ', 'kṛṣṇau', 'kṛṣṇāḥ'],
  ['kṛṣṇam', 'kṛṣṇau', 'kṛṣṇān'],
  ['kṛṣṇena', 'kṛṣṇābhyām', 'kṛṣṇaiḥ'],
  ['kṛṣṇāya', 'kṛṣṇābhyām', 'kṛṣṇebhyaḥ'],
  ['kṛṣṇāt', 'kṛṣṇābhyām', 'kṛṣṇebhyaḥ'],
  ['kṛṣṇasya', 'kṛṣṇayoḥ', 'kṛṣṇānām'],
  ['kṛṣṇe', 'kṛṣṇayoḥ', 'kṛṣṇeṣu'],
  ['he kṛṣṇa', 'he kṛṣṇau', 'he kṛṣṇāḥ'],
]

const krishnaEnglish: [string, string, string][] = [
  ['Krishna (subject)', 'Two Krishnas (subject)', 'Krishnas (subject)'],
  ['Krishna (object)', 'Two Krishnas (object)', 'Krishnas (object)'],
  ['By Krishna', 'By two Krishnas', 'By Krishnas'],
  ['To/For Krishna', 'To/For two Krishnas', 'To/For Krishnas'],
  ['From Krishna', 'From two Krishnas', 'From Krishnas'],
  ['Of Krishna', 'Of two Krishnas', 'Of Krishnas'],
  ['In/On Krishna', 'In/On two Krishnas', 'In/On Krishnas'],
  ['O Krishna!', 'O two Krishnas!', 'O Krishnas!'],
]

// ─── Feminine ā-stem: राधा (Rādhā) ───

const radhaDeclension: [string, string, string][] = [
  ['राधा', 'राधे', 'राधाः'],
  ['राधाम्', 'राधे', 'राधाः'],
  ['राधया', 'राधाभ्याम्', 'राधाभिः'],
  ['राधायै', 'राधाभ्याम्', 'राधाभ्यः'],
  ['राधायाः', 'राधाभ्याम्', 'राधाभ्यः'],
  ['राधायाः', 'राधयोः', 'राधानाम्'],
  ['राधायाम्', 'राधयोः', 'राधासु'],
  ['हे राधे', 'हे राधे', 'हे राधाः'],
]

const radhaTranslit: [string, string, string][] = [
  ['rādhā', 'rādhe', 'rādhāḥ'],
  ['rādhām', 'rādhe', 'rādhāḥ'],
  ['rādhayā', 'rādhābhyām', 'rādhābhiḥ'],
  ['rādhāyai', 'rādhābhyām', 'rādhābhyaḥ'],
  ['rādhāyāḥ', 'rādhābhyām', 'rādhābhyaḥ'],
  ['rādhāyāḥ', 'rādhayoḥ', 'rādhānām'],
  ['rādhāyām', 'rādhayoḥ', 'rādhāsu'],
  ['he rādhe', 'he rādhe', 'he rādhāḥ'],
]

const radhaEnglish: [string, string, string][] = [
  ['Rādhā (subject)', 'Two Rādhās (subject)', 'Rādhās (subject)'],
  ['Rādhā (object)', 'Two Rādhās (object)', 'Rādhās (object)'],
  ['By Rādhā', 'By two Rādhās', 'By Rādhās'],
  ['To/For Rādhā', 'To/For two Rādhās', 'To/For Rādhās'],
  ['From Rādhā', 'From two Rādhās', 'From Rādhās'],
  ['Of Rādhā', 'Of two Rādhās', 'Of Rādhās'],
  ['In/On Rādhā', 'In/On two Rādhās', 'In/On Rādhās'],
  ['O Rādhā!', 'O two Rādhās!', 'O Rādhās!'],
]

// ─── Neuter a-stem: फलम् (Phalam) ───

const phalamDeclension: [string, string, string][] = [
  ['फलम्', 'फले', 'फलानि'],
  ['फलम्', 'फले', 'फलानि'],
  ['फलेन', 'फलाभ्याम्', 'फलैः'],
  ['फलाय', 'फलाभ्याम्', 'फलेभ्यः'],
  ['फलात्', 'फलाभ्याम्', 'फलेभ्यः'],
  ['फलस्य', 'फलयोः', 'फलानाम्'],
  ['फले', 'फलयोः', 'फलेषु'],
  ['हे फल', 'हे फले', 'हे फलानि'],
]

const phalamTranslit: [string, string, string][] = [
  ['phalam', 'phale', 'phalāni'],
  ['phalam', 'phale', 'phalāni'],
  ['phalena', 'phalābhyām', 'phalaiḥ'],
  ['phalāya', 'phalābhyām', 'phalebhyaḥ'],
  ['phalāt', 'phalābhyām', 'phalebhyaḥ'],
  ['phalasya', 'phalayoḥ', 'phalānām'],
  ['phale', 'phalayoḥ', 'phaleṣu'],
  ['he phala', 'he phale', 'he phalāni'],
]

const phalamEnglish: [string, string, string][] = [
  ['Fruit (subject)', 'Two fruits (subject)', 'Fruits (subject)'],
  ['Fruit (object)', 'Two fruits (object)', 'Fruits (object)'],
  ['By fruit', 'By two fruits', 'By fruits'],
  ['To/For fruit', 'To/For two fruits', 'To/For fruits'],
  ['From fruit', 'From two fruits', 'From fruits'],
  ['Of fruit', 'Of two fruits', 'Of fruits'],
  ['In/On fruit', 'In/On two fruits', 'In/On fruits'],
  ['O fruit!', 'O two fruits!', 'O fruits!'],
]

function buildCards(
  declension: [string, string, string][],
  translit: [string, string, string][],
  english: [string, string, string][],
): FlashcardItem[] {
  const cards: FlashcardItem[] = []
  for (let c = 0; c < 8; c++) {
    for (let n = 0; n < 3; n++) {
      const caseName = CASE_NAMES[c]
      const caseInfo = CASE_ENGLISH[caseName]
      cards.push({
        devanagari: declension[c][n],
        transliteration: translit[c][n],
        caseLabel: caseName,
        numberLabel: NUMBERS[n],
        english: `${english[c][n]} — ${caseInfo.fn}`,
        explanation: `${caseName} case (${caseInfo.fn}): ${caseInfo.desc}`,
      })
    }
  }
  return cards
}

// ─── Plural comparison summary cards ───

const pluralSummaryCards: FlashcardItem[] = [
  // Masculine
  { devanagari: 'कृष्णाः', transliteration: 'kṛṣṇāḥ', caseLabel: 'Nominative', numberLabel: 'Masc. Plural', english: 'Krishnas (subject)', explanation: 'Masculine a-stem nominative plural ends in -āḥ' },
  { devanagari: 'कृष्णान्', transliteration: 'kṛṣṇān', caseLabel: 'Accusative', numberLabel: 'Masc. Plural', english: 'Krishnas (object)', explanation: 'Masculine a-stem accusative plural ends in -ān' },
  { devanagari: 'कृष्णैः', transliteration: 'kṛṣṇaiḥ', caseLabel: 'Instrumental', numberLabel: 'Masc. Plural', english: 'By Krishnas', explanation: 'Masculine a-stem instrumental plural ends in -aiḥ' },
  { devanagari: 'कृष्णेभ्यः', transliteration: 'kṛṣṇebhyaḥ', caseLabel: 'Dative/Ablative', numberLabel: 'Masc. Plural', english: 'To/From Krishnas', explanation: 'Masculine a-stem dative & ablative plural ends in -ebhyaḥ' },
  { devanagari: 'कृष्णानाम्', transliteration: 'kṛṣṇānām', caseLabel: 'Genitive', numberLabel: 'Masc. Plural', english: 'Of Krishnas', explanation: 'Masculine a-stem genitive plural ends in -ānām' },
  { devanagari: 'कृष्णेषु', transliteration: 'kṛṣṇeṣu', caseLabel: 'Locative', numberLabel: 'Masc. Plural', english: 'In Krishnas', explanation: 'Masculine a-stem locative plural ends in -eṣu' },
  // Feminine
  { devanagari: 'राधाः', transliteration: 'rādhāḥ', caseLabel: 'Nominative', numberLabel: 'Fem. Plural', english: 'Rādhās (subject)', explanation: 'Feminine ā-stem nominative plural ends in -āḥ' },
  { devanagari: 'राधाभिः', transliteration: 'rādhābhiḥ', caseLabel: 'Instrumental', numberLabel: 'Fem. Plural', english: 'By Rādhās', explanation: 'Feminine ā-stem instrumental plural ends in -ābhiḥ' },
  { devanagari: 'राधाभ्यः', transliteration: 'rādhābhyaḥ', caseLabel: 'Dative/Ablative', numberLabel: 'Fem. Plural', english: 'To/From Rādhās', explanation: 'Feminine ā-stem dative & ablative plural ends in -ābhyaḥ' },
  { devanagari: 'राधानाम्', transliteration: 'rādhānām', caseLabel: 'Genitive', numberLabel: 'Fem. Plural', english: 'Of Rādhās', explanation: 'Feminine ā-stem genitive plural ends in -ānām' },
  { devanagari: 'राधासु', transliteration: 'rādhāsu', caseLabel: 'Locative', numberLabel: 'Fem. Plural', english: 'In Rādhās', explanation: 'Feminine ā-stem locative plural ends in -āsu' },
  // Neuter
  { devanagari: 'फलानि', transliteration: 'phalāni', caseLabel: 'Nom/Acc', numberLabel: 'Neut. Plural', english: 'Fruits (subj/obj)', explanation: 'Neuter a-stem nominative & accusative plural ends in -āni' },
  { devanagari: 'फलैः', transliteration: 'phalaiḥ', caseLabel: 'Instrumental', numberLabel: 'Neut. Plural', english: 'By fruits', explanation: 'Neuter a-stem instrumental plural ends in -aiḥ (same as masculine)' },
  { devanagari: 'फलेभ्यः', transliteration: 'phalebhyaḥ', caseLabel: 'Dative/Ablative', numberLabel: 'Neut. Plural', english: 'To/From fruits', explanation: 'Neuter a-stem dat/abl plural ends in -ebhyaḥ (same as masculine)' },
  { devanagari: 'फलानाम्', transliteration: 'phalānām', caseLabel: 'Genitive', numberLabel: 'Neut. Plural', english: 'Of fruits', explanation: 'Neuter a-stem genitive plural ends in -ānām' },
  { devanagari: 'फलेषु', transliteration: 'phaleṣu', caseLabel: 'Locative', numberLabel: 'Neut. Plural', english: 'In fruits', explanation: 'Neuter a-stem locative plural ends in -eṣu (same as masculine)' },
]

export const FLASHCARD_CATEGORIES: FlashcardCategory[] = [
  {
    id: 'masc-a',
    title: 'Masculine a-stem',
    subtitle: 'कृष्ण — Kṛṣṇa',
    baseWord: 'कृष्ण',
    baseTranslit: 'Kṛṣṇa',
    cards: buildCards(krishnaDeclension, krishnaTranslit, krishnaEnglish),
  },
  {
    id: 'fem-aa',
    title: 'Feminine ā-stem',
    subtitle: 'राधा — Rādhā',
    baseWord: 'राधा',
    baseTranslit: 'Rādhā',
    cards: buildCards(radhaDeclension, radhaTranslit, radhaEnglish),
  },
  {
    id: 'neut-a',
    title: 'Neuter a-stem',
    subtitle: 'फलम् — Phalam',
    baseWord: 'फलम्',
    baseTranslit: 'Phalam',
    cards: buildCards(phalamDeclension, phalamTranslit, phalamEnglish),
  },
  {
    id: 'plural-summary',
    title: 'Plural Comparison',
    subtitle: 'All three genders side by side',
    baseWord: 'बहुवचन',
    baseTranslit: 'Bahuvacana',
    cards: pluralSummaryCards,
  },
]
