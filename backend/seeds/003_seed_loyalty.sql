INSERT INTO loyalty_tiers (id, name, min_points, multiplier, color, description, benefits, sort_order) VALUES
  ('mortal',   'MORTAL',    0,    1.0, '#7a7570', 'Empieza tu viaje oscuro',     '["5% de descuento en tu cumpleaños", "Acceso a drops con 24h de anticipación"]', 1),
  ('sombra',   'SOMBRA',    500,  1.2, '#8a6f44', 'La noche te reconoce',        '["8% de descuento en todas las compras", "Envío gratis en pedidos >$50", "Acceso anticipado a drops"]', 2),
  ('eclipse',  'ECLIPSE',   1500, 1.5, '#c9a96e', 'Brillas en la oscuridad',     '["12% de descuento en todas las compras", "Envío gratis ilimitado", "Acceso VIP a drops", "Producto sorpresa en tu cumpleaños"]', 3),
  ('neko_noir','NEKO NOIR', 4000, 2.0, '#e2c48a', 'La oscuridad te corona',      '["18% de descuento en todas las compras", "Envío gratis ilimitado prioritario", "Acceso VIP+ a drops", "Caja de bienvenida anual", "Línea directa WhatsApp con el equipo"]', 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO rewards (id, title, description, cost, icon, tier_id, active) VALUES
  ('reward_1', '5% Descuento',    'Descuento del 5% en tu próxima compra',               100,  '🏷️', NULL, TRUE),
  ('reward_2', '10% Descuento',   'Descuento del 10% en tu próxima compra',              200,  '🖤',  NULL, TRUE),
  ('reward_3', 'Envío Gratis',    'Envío gratis en tu próximo pedido (CR)',              150,  '📦',  NULL, TRUE),
  ('reward_4', '15% Descuento',   'Descuento del 15% en tu próxima compra',              350,  '⭐',  'eclipse', TRUE),
  ('reward_5', 'Collar Moon Phase','Collar Moon Phase edición recompensa',                500,  '🌙',  'eclipse', TRUE),
  ('reward_6', '25% VIP Drop',    'Descuento del 25% en el próximo drop',                800,  '✦',   'neko_noir', TRUE)
ON CONFLICT (id) DO NOTHING;
