UPDATE products
SET badge = '',
    description = CASE
      WHEN id = 'demo-vestido-03'
        THEN 'Saten vino profundo con detalles negros para un look elegante de noche.'
      WHEN id = 'demo-conjunto-01'
        THEN 'Top estructurado y falda midi negra para un look completo.'
      WHEN id = 'demo-conjunto-02'
        THEN 'Blazer negro y pantalon palazzo para un look completo de noche.'
      WHEN id = 'demo-conjunto-03'
        THEN 'Corset satinado con falda lapiz para una silueta oscura y elegante.'
      WHEN id = 'demo-accesorio-02'
        THEN 'Anillo plateado con piedra negra disponible en varias tallas.'
      ELSE description
    END,
    updated_at = NOW()
WHERE id LIKE 'demo-%' AND (badge = 'DEMO' OR description ILIKE '%demo%' OR description ILIKE '%ejemplo%');
