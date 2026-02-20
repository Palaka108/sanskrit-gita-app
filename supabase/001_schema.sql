-- ============================================
-- Sanskrit Gita App — Schema Migration
-- Version 0.2 — Multi-verse Grammar Expansion
-- ============================================

-- Verses table
create table if not exists verses (
  id uuid primary key default gen_random_uuid(),
  chapter int not null,
  verse int not null,
  devanagari text not null,
  transliteration text not null,
  translation text not null,
  grammar_focus text,
  source_text text default 'gita',
  created_at timestamptz default now()
);

-- Roots table (verb dhatu reference)
create table if not exists roots (
  id uuid primary key default gen_random_uuid(),
  dhatu text not null,
  meaning text not null,
  verb_class text,
  pada text,
  example_form text,
  created_at timestamptz default now()
);

-- Words table (grammar breakdown)
create table if not exists words (
  id uuid primary key default gen_random_uuid(),
  verse_id uuid not null references verses(id) on delete cascade,
  word text not null,
  root text,
  grammatical_case text,
  number text,
  tense text,
  meaning text not null,
  grammar_note text,
  root_id uuid references roots(id),
  spiritual_insight text,
  created_at timestamptz default now()
);

-- Commentaries table
create table if not exists commentaries (
  id uuid primary key default gen_random_uuid(),
  verse_id uuid not null references verses(id) on delete cascade,
  acharya text not null,
  summary text not null,
  key_phrases text[] default '{}',
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_words_verse_id on words(verse_id);
create index if not exists idx_commentaries_verse_id on commentaries(verse_id);
create index if not exists idx_verses_chapter_verse on verses(chapter, verse);
create index if not exists idx_words_root_id on words(root_id);
create index if not exists idx_verses_source_text on verses(source_text);
