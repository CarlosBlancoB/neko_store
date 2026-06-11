CREATE TABLE IF NOT EXISTS assets (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  file_path   TEXT NOT NULL,
  mime_type   TEXT DEFAULT 'image/png',
  size_bytes  INTEGER DEFAULT 0,
  campaign_id TEXT REFERENCES social_campaigns(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
