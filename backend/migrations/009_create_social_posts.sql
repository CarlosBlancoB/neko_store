CREATE TABLE IF NOT EXISTS social_posts (
  id               TEXT PRIMARY KEY,
  campaign_id      TEXT REFERENCES social_campaigns(id) ON DELETE SET NULL,
  title            TEXT DEFAULT '',
  text             TEXT NOT NULL,
  images           JSONB DEFAULT '[]',
  platform         TEXT NOT NULL DEFAULT 'both',
  scheduled_at     TIMESTAMPTZ,
  published_at     TIMESTAMPTZ,
  status           TEXT NOT NULL DEFAULT 'draft',
  facebook_post_id TEXT,
  instagram_post_id TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_social_posts_campaign ON social_posts(campaign_id);
CREATE INDEX idx_social_posts_status ON social_posts(status);
CREATE INDEX idx_social_posts_scheduled ON social_posts(scheduled_at);
