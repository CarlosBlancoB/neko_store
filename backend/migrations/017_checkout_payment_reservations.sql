ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method TEXT NOT NULL DEFAULT 'sinpe_movil';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_reference TEXT DEFAULT '';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS reserved_until TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;

ALTER TABLE notifications ADD COLUMN IF NOT EXISTS for_role TEXT NOT NULL DEFAULT 'customer';

CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_reserved_until ON orders(reserved_until);
CREATE INDEX IF NOT EXISTS idx_notifications_for_role ON notifications(for_role);
