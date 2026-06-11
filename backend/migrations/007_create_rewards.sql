CREATE TABLE IF NOT EXISTS rewards (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT DEFAULT '',
  cost        INTEGER NOT NULL,
  icon        TEXT DEFAULT '🎁',
  tier_id     TEXT REFERENCES loyalty_tiers(id) ON DELETE SET NULL,
  active      BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reward_redemptions (
  id          TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  reward_id   TEXT NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
  points_spent INTEGER NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_redemptions_customer ON reward_redemptions(customer_id);
