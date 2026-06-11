CREATE TABLE IF NOT EXISTS loyalty_tiers (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  min_points   INTEGER NOT NULL DEFAULT 0,
  multiplier   NUMERIC(3,1) NOT NULL DEFAULT 1.0,
  color        TEXT DEFAULT '#c9a96e',
  description  TEXT DEFAULT '',
  benefits     JSONB DEFAULT '[]',
  sort_order   INTEGER NOT NULL DEFAULT 0
);
