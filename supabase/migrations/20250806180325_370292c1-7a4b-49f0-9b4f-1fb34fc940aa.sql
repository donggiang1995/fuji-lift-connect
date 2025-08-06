-- Create admin profile directly
INSERT INTO public.profiles (
  id,
  user_id,
  email,
  full_name,
  role,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  gen_random_uuid(),
  'admin@company.com',
  'Admin User',
  'admin',
  now(),
  now()
) ON CONFLICT (email) DO NOTHING;