INSERT INTO categories (id, name, slug) VALUES
  ('vestidos', 'Vestidos', 'vestidos'),
  ('tops', 'Tops', 'tops'),
  ('conjuntos', 'Conjuntos', 'conjuntos'),
  ('accesorios', 'Accesorios', 'accesorios')
ON CONFLICT (id) DO NOTHING;
