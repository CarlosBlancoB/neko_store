INSERT INTO customers (
  id,
  name,
  email,
  phone,
  password_hash,
  points,
  lifetime_points,
  tier_id,
  tier,
  role,
  is_demo,
  created_at
) VALUES (
  'admin_neko',
  'Admin NEKO',
  'admin@nekostore.cr',
  '50624247171',
  '$2b$10$/DcvmrFnIc5Uuc7tDq1YLOcNfPSDBWYEXVXnx/Ld8fRuNzXlFmso2',
  0,
  0,
  'neko_noir',
  'NEKO NOIR',
  'admin',
  FALSE,
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  updated_at = NOW();
