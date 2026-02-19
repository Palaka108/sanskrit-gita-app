-- ============================================
-- Sanskrit Gita App — Schema Migration
-- Version 0.1 — BG 18.66 MVP
-- ============================================

-- Verses table
create table if not exists verses (
  id uuid primary key default gen_random_uuid(),
  chapter int not null,
  verse int not null,
  devanagari text not null,
  transliteration text not null,
  translation text not null,
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
