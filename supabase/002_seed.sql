-- ============================================
-- Seed Data — BG 18.66
-- ============================================

-- Insert verse
insert into verses (id, chapter, verse, devanagari, transliteration, translation)
values (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  18,
  66,
  'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।
अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥',
  'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja
ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ',
  'Abandon all varieties of dharma and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.'
);

-- Insert words (grammar breakdown)
insert into words (verse_id, word, root, grammatical_case, number, tense, meaning, grammar_note) values
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'sarva-dharmān',
  'dharma',
  'accusative',
  'plural',
  null,
  'all varieties of dharma (religious duties)',
  'Compound of sarva (all) + dharmān (dharmas, accusative plural). Indicates the totality of prescribed duties, rituals, and religious obligations.'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'parityajya',
  'tyaj',
  null,
  null,
  'gerund (absolutive)',
  'having abandoned, having given up completely',
  'Gerund formed with prefix pari- (completely) + tyaj (to abandon) + -ya. The absolutive indicates this action precedes the main verb vraja.'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'mām',
  'mad (asmad)',
  'accusative',
  'singular',
  null,
  'unto Me (Kṛṣṇa, the Supreme Personality of Godhead)',
  'First person pronoun in the accusative case. Kṛṣṇa refers to Himself as the ultimate shelter and goal of surrender.'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'ekam',
  'eka',
  'accusative',
  'singular',
  null,
  'alone, exclusively, only',
  'Adjective modifying mām. Emphasizes exclusive surrender — not partially or alongside other shelters, but to Kṛṣṇa alone.'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'śaraṇam',
  'śaraṇa',
  'accusative',
  'singular',
  null,
  'refuge, shelter, surrender',
  'Neuter noun indicating the act or state of taking shelter. In Vaiṣṇava theology, śaraṇāgati (surrender) is the essential act of devotion.'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'vraja',
  'vraj',
  null,
  'singular',
  'imperative (second person)',
  'go, approach, take to',
  'Imperative mood of vraj (to go). Kṛṣṇa directly commands Arjuna — this is not a suggestion but a definitive instruction from the Supreme.'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'mokṣayiṣyāmi',
  'mokṣ (muc)',
  null,
  'singular',
  'future (first person)',
  'I shall liberate, I shall deliver',
  'Causative future tense of muc (to release). Kṛṣṇa personally guarantees liberation. The causative form indicates He actively delivers the devotee — it is His action, not the devotee''s effort.'
);

-- Insert commentaries
insert into commentaries (verse_id, acharya, summary, key_phrases) values
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'A.C. Bhaktivedanta Swami Prabhupada',
  'This verse is the essence of the entire Bhagavad-gita. The Lord has described various kinds of knowledge, processes of religion, and the glories of devotional service. Now He summarizes everything: one should give up all other processes and simply surrender unto Krsna. That surrender will save one from all kinds of sinful reactions. Krsna personally promises to protect His devotee.',
  ARRAY['surrender unto Me', 'essence of Gita', 'personal promise of protection', 'give up all other processes']
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Bhaktisiddhanta Sarasvati Thakura',
  'The supreme instruction (carama-sloka) of the Gita. All forms of dharma — whether karma, jnana, yoga, or even varnasrama duties — are subsidiary to the direct shelter of Krsna. Prapatti (self-surrender) is not one method among many; it is the only method. The word "eka" eliminates all competing shelters.',
  ARRAY['carama-sloka', 'prapatti as sole method', 'eka eliminates competing shelters', 'subsidiary dharmas transcended']
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Bhaktivinoda Thakura',
  'Krsna here reveals the innermost teaching. The jiva, entangled in material dharmas born of false ego, must abandon reliance on these self-generated duties and take exclusive shelter of the Lord. This is not renunciation of action but renunciation of the false sense of being the doer. The Lord''s promise of liberation is unconditional for one who truly surrenders.',
  ARRAY['innermost teaching', 'abandon false doership', 'unconditional promise', 'exclusive shelter']
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Jiva Gosvami',
  'Sarva-dharman refers to all prescribed duties that one has accepted based on varna, asrama, and personal qualification. Parityajya indicates complete relinquishment — not gradual reduction. The imperative vraja carries the weight of a royal command. Moksayisyami in the causative future tense means Krsna Himself will act as the agent of liberation; the devotee need not independently endeavor for moksa.',
  ARRAY['complete relinquishment', 'royal command', 'Krsna as agent of liberation', 'causative future tense']
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Visvanatha Cakravarti Thakura',
  'Krsna speaks this verse to dispel Arjuna''s anxiety. Having heard so many instructions — on karma, jnana, dhyana, bhakti — Arjuna may feel overwhelmed. Krsna now simplifies everything: "Just come to Me." The words "ma sucah" (do not grieve) echo the opening instruction of Chapter 2 and bring the Gita full circle. Surrender is both the beginning and the conclusion.',
  ARRAY['dispels anxiety', 'simplifies all instructions', 'ma sucah echoes Chapter 2', 'full circle of Gita']
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Sridhara Svami',
  'This verse establishes saranagati (surrender) as the ultimate purusartha (goal of human life), surpassing even moksa as conventionally understood. Sarva-dharman parityajya does not negate dharma but reveals that all dharma finds its perfection in surrender to the Supreme. The Lord''s assurance removes the fear of sin that might otherwise prevent one from abandoning conventional duties.',
  ARRAY['saranagati as ultimate purusartha', 'dharma perfected in surrender', 'fear of sin removed', 'surpasses conventional moksa']
);
