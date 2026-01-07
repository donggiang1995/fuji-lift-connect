-- Update profile role to admin for vnt@admin.com
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'vnt@admin.com';