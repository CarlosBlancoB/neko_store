CREATE TABLE IF NOT EXISTS orders (
  id              TEXT PRIMARY KEY,
  customer_id     TEXT REFERENCES customers(id) ON DELETE SET NULL,
  customer_name   TEXT NOT NULL,
  customer_phone  TEXT NOT NULL,
  customer_email  TEXT DEFAULT '',
  shipping_address TEXT NOT NULL,
  shipping_method TEXT NOT NULL DEFAULT 'starkref',
  shipping_cost   NUMERIC(10,2) NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'pending',
  items_total     NUMERIC(10,2) NOT NULL DEFAULT 0,
  total           NUMERIC(10,2) NOT NULL DEFAULT 0,
  notes           TEXT DEFAULT '',
  points_earned   INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
