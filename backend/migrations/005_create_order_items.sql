CREATE TABLE IF NOT EXISTS order_items (
  id         TEXT PRIMARY KEY,
  order_id   TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  name       TEXT NOT NULL,
  size       TEXT NOT NULL DEFAULT '',
  quantity   INTEGER NOT NULL DEFAULT 1,
  price      NUMERIC(10,2) NOT NULL,
  subtotal   NUMERIC(10,2) NOT NULL
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
