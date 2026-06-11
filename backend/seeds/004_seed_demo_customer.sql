INSERT INTO customers (id, name, email, phone, password_hash, points, lifetime_points, tier_id, is_demo, created_at) VALUES
  ('demo_valentina', 'Valentina Neko', 'valentina@nekostore.cr', '24247171', '$2b$10$demo_hash_placeholder', 1620, 3890, 'eclipse', TRUE, NOW() - INTERVAL '90 days')
ON CONFLICT (id) DO NOTHING;
