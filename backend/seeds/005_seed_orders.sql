INSERT INTO orders (id, customer_id, customer_name, customer_phone, shipping_address, shipping_method, shipping_cost, status, items_total, total, notes, points_earned, created_at) VALUES
  ('NK-DEMO001', 'demo_valentina', 'Valentina Neko', '24247171', 'San José, Costa Rica', 'Recogida en tienda', 0, 'confirmed', 117, 117, '', 117, NOW() - INTERVAL '60 days'),
  ('NK-DEMO002', 'demo_valentina', 'Valentina Neko', '24247171', 'Heredia, Costa Rica', 'starkref', 5, 'confirmed', 137, 142, 'Empaque especial por favor', 130, NOW() - INTERVAL '30 days'),
  ('NK-DEMO003', 'demo_valentina', 'Valentina Neko', '24247171', 'San José, Costa Rica', 'Recogida en tienda', 0, 'pending', 135, 135, '', 135, NOW() - INTERVAL '5 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO order_items (id, order_id, product_id, name, size, quantity, price, subtotal) VALUES
  ('oi_demo_001', 'NK-DEMO001', '1', 'Vestido Shadow Bloom', 'M', 1, 89, 89),
  ('oi_demo_002', 'NK-DEMO001', '4', 'Collar Moon Phase', 'Único', 1, 28, 28),
  ('oi_demo_003', 'NK-DEMO002', '2', 'Corset Velvet Requiem', 'S', 1, 65, 65),
  ('oi_demo_004', 'NK-DEMO002', '7', 'Falda Eclipse', 'M', 1, 72, 72),
  ('oi_demo_005', 'NK-DEMO003', '10', 'Vestido Coven', 'M', 1, 135, 135)
ON CONFLICT (id) DO NOTHING;
