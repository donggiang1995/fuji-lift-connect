-- Create admin profile directly with a dummy user_id for now
INSERT INTO public.profiles (
  user_id,
  email,
  full_name,
  role,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'admin@fuji.com',
  'Admin User',
  'admin',
  now(),
  now()
) ON CONFLICT (user_id) DO NOTHING;