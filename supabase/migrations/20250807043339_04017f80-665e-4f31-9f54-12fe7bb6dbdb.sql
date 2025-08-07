-- Update product name from "FJK2-B TRACTION MACHINE 240mm" to "FJK2–B450KG TRACTION MACHINE 240mm"
UPDATE products 
SET name_en = 'FJK2–B450KG TRACTION MACHINE 240mm',
    name_ko = 'FJK2–B450KG TRACTION MACHINE 240mm'
WHERE name_en = 'FJK2-B TRACTION MACHINE 240mm';

-- Update products to have specific ordering by updating created_at timestamps
-- Set specific timestamps to control display order (newest first in the app)
UPDATE products SET created_at = '2024-01-05T00:00:00Z' WHERE name_en = 'FJK1-B TRACTION MACHINE 325mm';
UPDATE products SET created_at = '2024-01-04T00:00:00Z' WHERE name_en = 'FJK1-B TRACTION MACHINE 400mm';
UPDATE products SET created_at = '2024-01-03T00:00:00Z' WHERE name_en = 'FJK2–B450KG TRACTION MACHINE 240mm';
UPDATE products SET created_at = '2024-01-02T00:00:00Z' WHERE name_en = 'FJK2 – B630-800KG TRACTION 240mm';
UPDATE products SET created_at = '2024-01-01T00:00:00Z' WHERE name_en = 'FJK2-B630 TRACTION MACHINE 320mm';