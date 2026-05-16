-- Nekrolog.AI — Supabase Schema
-- Uruchom w Supabase SQL Editor

-- Wall of the Dead
CREATE TABLE IF NOT EXISTS wall_of_dead (
  id BIGSERIAL PRIMARY KEY,
  nick TEXT NOT NULL DEFAULT 'Anonim',
  text TEXT NOT NULL,
  votes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE wall_of_dead ENABLE ROW LEVEL SECURITY;

-- Anyone can read
CREATE POLICY "Public read" ON wall_of_dead
  FOR SELECT USING (true);

-- Anyone can insert (anon)
CREATE POLICY "Public insert" ON wall_of_dead
  FOR INSERT WITH CHECK (true);

-- Donors / supporters
CREATE TABLE IF NOT EXISTS donors (
  id BIGSERIAL PRIMARY KEY,
  nick TEXT NOT NULL DEFAULT 'Anonim',
  amount NUMERIC(10, 2) NOT NULL,
  epitaph TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE donors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read donors" ON donors
  FOR SELECT USING (true);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_wall_votes ON wall_of_dead(votes DESC);
CREATE INDEX IF NOT EXISTS idx_wall_created ON wall_of_dead(created_at DESC);
