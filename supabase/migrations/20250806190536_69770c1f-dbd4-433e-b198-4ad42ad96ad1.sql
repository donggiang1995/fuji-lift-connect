-- Update serial_numbers table structure
ALTER TABLE public.serial_numbers 
DROP COLUMN IF EXISTS product_name,
DROP COLUMN IF EXISTS model,
DROP COLUMN IF EXISTS manufacture_date,
ADD COLUMN IF NOT EXISTS product_id uuid REFERENCES products(id),
ADD COLUMN IF NOT EXISTS installation_date text,
ADD COLUMN IF NOT EXISTS location text;

-- Update status column to have proper constraints
ALTER TABLE public.serial_numbers 
ALTER COLUMN status SET DEFAULT 'active';

-- Add check constraint for status values
ALTER TABLE public.serial_numbers 
DROP CONSTRAINT IF EXISTS status_check;

ALTER TABLE public.serial_numbers 
ADD CONSTRAINT status_check CHECK (status IN ('active', 'maintenance', 'retired'));

-- Create index for better search performance
CREATE INDEX IF NOT EXISTS idx_serial_numbers_search ON public.serial_numbers (serial_number);
CREATE INDEX IF NOT EXISTS idx_serial_numbers_product_id ON public.serial_numbers (product_id);

-- Update RLS policies to allow public search
DROP POLICY IF EXISTS "Public can search serial numbers" ON public.serial_numbers;
CREATE POLICY "Public can search serial numbers" 
ON public.serial_numbers 
FOR SELECT 
USING (true);