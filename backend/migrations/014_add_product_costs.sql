-- Add cost_price and low_stock_threshold to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS cost_price NUMERIC(10,2) DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS low_stock_threshold INTEGER DEFAULT 5;

-- Update existing products with estimated cost prices (roughly 40-50% of price)
UPDATE products SET cost_price = ROUND(price * 0.42) WHERE cost_price = 0 OR cost_price IS NULL;
UPDATE products SET low_stock_threshold = 5 WHERE low_stock_threshold IS NULL;
