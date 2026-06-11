CREATE TABLE IF NOT EXISTS store_config (
  key   TEXT PRIMARY KEY,
  value JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS branding_config (
  id                    TEXT PRIMARY KEY DEFAULT 'default',
  logo_url              TEXT DEFAULT '',
  primary_color         TEXT DEFAULT '#050508',
  accent_color          TEXT DEFAULT '#c9a96e',
  text_color            TEXT DEFAULT '#e8e4dc',
  store_url             TEXT DEFAULT 'nekostore.cr',
  qr_size               INTEGER DEFAULT 200,
  qr_correction_level   TEXT DEFAULT 'M',
  apply_to_social_posts BOOLEAN DEFAULT TRUE,
  apply_to_og_images    BOOLEAN DEFAULT TRUE,
  apply_to_whatsapp     BOOLEAN DEFAULT TRUE,
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wa_config (
  id                     TEXT PRIMARY KEY DEFAULT 'default',
  admin_phone            TEXT DEFAULT '',
  enabled_customer_types JSONB DEFAULT '[]',
  enabled_admin_types    JSONB DEFAULT '[]',
  updated_at             TIMESTAMPTZ DEFAULT NOW()
);
