-- Create admin user directly in auth.users
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
  aud,
  role,
  confirmation_token,
  recovery_token
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'vnt@admin.com',
  crypt('123123123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "VNT Admin"}',
  'authenticated',
  'authenticated',
  '',
  ''
);

-- Update the profile role to admin (the trigger should have created the profile)
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'vnt@admin.com';