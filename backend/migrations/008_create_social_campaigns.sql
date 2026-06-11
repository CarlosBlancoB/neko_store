CREATE TABLE IF NOT EXISTS social_campaigns (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT DEFAULT '',
  start_date  DATE NOT NULL,
  end_date    DATE NOT NULL,
  objective   TEXT NOT NULL DEFAULT 'engagement',
  status      TEXT NOT NULL DEFAULT 'draft',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_social_campaigns_status ON social_campaigns(status);
