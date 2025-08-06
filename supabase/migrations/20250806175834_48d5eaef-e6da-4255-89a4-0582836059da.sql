-- Create admin user account
-- Note: This creates the user directly in the auth.users table
-- The email will be 'admin' but we'll use it as username
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@company.com',
  crypt('Giang123@', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Admin User"}',
  false,
  'authenticated'
);

-- Create corresponding profile for the admin user
INSERT INTO public.profiles (
  user_id,
  email,
  full_name,
  role
)
SELECT 
  id,
  'admin@company.com',
  'Admin User',
  'admin'
FROM auth.users 
WHERE email = 'admin@company.com';