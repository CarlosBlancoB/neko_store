ALTER TABLE products ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS featured_sort_order INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured, featured_sort_order);

INSERT INTO site_content (id, section, key, value, image_url, sort_order)
VALUES
  (
    'about.hero_image',
    'about',
    'hero_image',
    'Neko Store',
    '/brand/nosotros.png',
    1
  ),
  (
    'about.body_1',
    'about',
    'body_1',
    'Neko Store nace en San Ramon de Alajuela para hacer la moda alternativa mas accesible en Costa Rica. Importamos y vendemos ropa seleccionada para quienes buscan estilo propio sin perder calidad.',
    NULL,
    2
  ),
  (
    'about.body_2',
    'about',
    'body_2',
    'Queremos construir una familia, no solo una lista de clientes. Por eso combinamos una experiencia cercana con rewards que devuelven valor a la lealtad de nuestra comunidad.',
    NULL,
    3
  ),
  (
    'contact.form_background_enabled',
    'contact',
    'form_background_enabled',
    'false',
    NULL,
    1
  ),
  (
    'contact.form_background',
    'contact',
    'form_background',
    'Fondo de formularios de contacto',
    '/brand/contacto.png',
    2
  )
ON CONFLICT (section, key) DO UPDATE
SET value = EXCLUDED.value,
    image_url = COALESCE(site_content.image_url, EXCLUDED.image_url),
    sort_order = EXCLUDED.sort_order,
    updated_at = NOW();
