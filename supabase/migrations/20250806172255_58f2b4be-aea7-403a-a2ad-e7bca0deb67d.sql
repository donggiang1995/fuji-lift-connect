-- Clear existing sample products first
DELETE FROM products WHERE name_en IN ('FCA-9000 Series', 'SCP-2024 Control Panel', 'TM-800S Traction Machine');

-- Insert TRACTION MACHINE products
INSERT INTO products (name_ko, name_en, description_ko, description_en, category_id, specifications, features_ko, features_en, is_active) VALUES
('FJK1-B (325mm)', 'FJK1-B (325mm)', 'FJK1-B 견인기 325mm 모델', 'FJK1-B Traction Machine 325mm model', 
 (SELECT id FROM categories WHERE name_en = 'Traction Machines'), 
 '{"Voltage": "380V", "Suspension": "2:1", "Brake": "DC110V 2x0.84A(2x1.1A)", "Weight": "200kg", "Max Static Load": "2000kg"}',
 ARRAY['고효율', '안정성', '내구성'], ARRAY['High Efficiency', 'Stability', 'Durability'], true),

('FJK1-B (400mm)', 'FJK1-B (400mm)', 'FJK1-B 견인기 400mm 모델', 'FJK1-B Traction Machine 400mm model', 
 (SELECT id FROM categories WHERE name_en = 'Traction Machines'), 
 '{"Voltage": "380V", "Suspension": "2:1", "Brake": "DC110V 2x1.0A(2x1.1A)", "Weight": "285kg", "Max Static Load": "3000kg"}',
 ARRAY['고효율', '안정성', '내구성'], ARRAY['High Efficiency', 'Stability', 'Durability'], true),

('FJK2 – B450KG (240mm)', 'FJK2 – B450KG (240mm)', 'FJK2 견인기 B450KG 240mm 모델', 'FJK2 Traction Machine B450KG 240mm model', 
 (SELECT id FROM categories WHERE name_en = 'Traction Machines'), 
 '{"Rated Voltage": "AC380V", "Brake Voltage": "DC110V", "Weight": "140kg", "Duty": "S5-40%", "Max Static Load": "2500kg", "Wrap": "Single", "Insulation": "F", "Protection": "IP41", "Traveling Height": "<90"}',
 ARRAY['고효율', '컴팩트', '내구성'], ARRAY['High Efficiency', 'Compact', 'Durability'], true),

('FJK2 – B630-800KG (240mm)', 'FJK2 – B630-800KG (240mm)', 'FJK2 견인기 B630-800KG 240mm 모델', 'FJK2 Traction Machine B630-800KG 240mm model', 
 (SELECT id FROM categories WHERE name_en = 'Traction Machines'), 
 '{"Rated Voltage": "AC380V", "Brake Voltage": "DC110V", "Weight": "200kg", "Duty": "S5-40%", "Max Static Load": "2500kg", "Wrap": "Single", "Protection": "IP41", "Traveling Height": "<90"}',
 ARRAY['고효율', '안정성', '내구성'], ARRAY['High Efficiency', 'Stability', 'Durability'], true),

('FJK2 – B630KG (320mm)', 'FJK2 – B630KG (320mm)', 'FJK2 견인기 B630KG 320mm 모델', 'FJK2 Traction Machine B630KG 320mm model', 
 (SELECT id FROM categories WHERE name_en = 'Traction Machines'), 
 '{"Rated Voltage": "AC380V", "Brake Voltage": "DC110V", "Weight": "200kg", "Duty": "S5-40%", "Max Static Load": "2500kg", "Wrap": "Single", "Insulation": "F", "Protection": "IP41", "Traveling Height": "<90"}',
 ARRAY['고효율', '컴팩트', '내구성'], ARRAY['High Efficiency', 'Compact', 'Durability'], true);

-- Insert CONTROL SYSTEMS products  
INSERT INTO products (name_ko, name_en, description_ko, description_en, category_id, specifications, features_ko, features_en, is_active) VALUES
('FJE1 제어 캐비닛', 'FJE1 CONTROL CABINET', 'FJE1 제어 캐비닛 - 스마트 제어 시스템', 'FJE1 Control Cabinet - Smart control system', 
 (SELECT id FROM categories WHERE name_en = 'Control Systems'), 
 '{"Remote Support": "APP", "Monitoring": "IoT", "Encoder": "Communication encoder supported", "Auto-tuning": "Balance coefficient", "Noise": "<50dBA"}',
 ARRAY['앱 원격 지원', 'IoT 원격 모니터링', '통신 인코더', '자동 튜닝', '저소음 설계'], 
 ARRAY['Remote technical support through APP', 'Remote monitoring through IoT', 'Communication encoder supported', 'Balance coefficient auto-tuning', 'Noise reduction design <50dBA'], true),

('FJE2 제어 캐비닛', 'FJE2 CONTROL CABINET', 'FJE2 제어 캐비닛 - 고급 제어 시스템', 'FJE2 Control Cabinet - Advanced control system', 
 (SELECT id FROM categories WHERE name_en = 'Control Systems'), 
 '{"Standard": "48 floors, full collective", "Group Control": "Duplex onboard (CANbus)", "Door Control": "Automatic", "Fireman Operation": "Selectable", "UPS Support": "1 ph. 220 Vac", "Diagnostics": "Comprehensive trip diagnostics"}',
 ARRAY['48층 표준', '듀플렉스 군관리', '자동 도어 제어', '소방 운전', 'UPS 지원', '종합 진단'], 
 ARRAY['Standard: 48 floors, full collective', 'Duplex onboard group control', 'Automatic door control mode', 'Selectable fireman operation', 'UPS support for rescue operation', 'Comprehensive trip diagnostics'], true);