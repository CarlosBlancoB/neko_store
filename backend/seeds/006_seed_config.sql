INSERT INTO store_config (key, value) VALUES
  ('whatsapp_number', '"50624247171"'),
  ('store_email', '"hola@nekostore.cr"'),
  ('instagram_handle', '"@nekostore.goth"'),
  ('intl_shipping_enabled', 'true'),
  ('intl_contact_email', '"international@nekostore.cr"'),
  ('store_name', '"NEKO STORE"'),
  ('store_tagline', '"Moda gótica. Alma oscura."'),
  ('currency_symbol', '"$"'),
  ('drop_active', 'true'),
  ('drop_title', '"Shadow Bloom"')
ON CONFLICT (key) DO NOTHING;

INSERT INTO branding_config (id, logo_url, primary_color, accent_color, text_color, store_url) VALUES
  ('default', '', '#050508', '#c9a96e', '#e8e4dc', 'nekostore.cr')
ON CONFLICT (id) DO NOTHING;

INSERT INTO wa_config (id, admin_phone, enabled_customer_types, enabled_admin_types) VALUES
  ('default', '50624247171', '["order_confirmed","order_shipped","reward_earned"]', '["new_order_admin","form_filled_admin"]')
ON CONFLICT (id) DO NOTHING;
