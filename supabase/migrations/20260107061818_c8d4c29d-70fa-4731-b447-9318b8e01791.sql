-- Delete the broken user and profile
DELETE FROM public.profiles WHERE email = 'vnt@admin.com';
DELETE FROM auth.users WHERE email = 'vnt@admin.com';