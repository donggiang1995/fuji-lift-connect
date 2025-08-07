-- Add the 5 new products with detailed information

-- First, let's get the category IDs (assuming they exist)
-- Control System and Traction Machine categories should already exist

-- Insert FJE1 CONTROL CABINET
INSERT INTO public.products (
  name_ko, name_en, 
  description_ko, description_en,
  category_id,
  specifications,
  features_ko, features_en,
  is_active
) VALUES (
  'FJE1 제어 캐비닛',
  'FJE1 CONTROL CABINET',
  '원격 기술 지원과 IoT 모니터링 기능을 갖춘 스마트 제어 캐비닛입니다. 50dBA 미만의 저소음 설계와 자동 균형 조정 기능을 제공합니다.',
  'Smart control cabinet with remote technical support and IoT monitoring capabilities. Features noise reduction design under 50dBA and automatic balance coefficient tuning.',
  (SELECT id FROM categories WHERE name_en ILIKE '%control%' LIMIT 1),
  '{"floors": "Up to 48 floors", "communication": "IoT enabled", "noise": "< 50dBA", "support": "Remote technical support"}',
  ARRAY['앱을 통한 원격 기술 지원', 'IoT를 통한 원격 모니터링', '통신 인코더 지원', '균형 계수 자동 조정', '50dBA 미만 저소음 설계'],
  ARRAY['Remote technical support through APP', 'Remote monitoring through the IoT', 'Communication encoder supported', 'Balance coefficient auto-tuning', 'Noise reduction design < 50dBA'],
  true
);

-- Insert FJE2 CONTROL CABINET
INSERT INTO public.products (
  name_ko, name_en,
  description_ko, description_en,
  category_id,
  specifications,
  features_ko, features_en,
  is_active
) VALUES (
  'FJE2 제어 캐비닛',
  'FJE2 CONTROL CABINET',
  '48층 표준 지원과 이중 온보드 그룹 제어 기능을 갖춘 고급 제어 캐비닛입니다. 자동 도어 제어와 UPS 백업 시스템을 지원합니다.',
  'Advanced control cabinet supporting 48 floors standard with duplex onboard group control. Features automatic door control and UPS backup system support.',
  (SELECT id FROM categories WHERE name_en ILIKE '%control%' LIMIT 1),
  '{"floors": "48 floors standard", "communication": "CANbus serial", "control": "Duplex group control", "backup": "UPS support"}',
  ARRAY['표준 48층 지원', '이중 온보드 그룹 제어', '자동 도어 제어 모드', '소방관 운전 선택 가능', 'UPS 백업 지원', '종합 트립 진단'],
  ARRAY['Standard: 48 floors, full collective', 'Duplex onboard group control', 'Automatic door control mode', 'Selectable fireman operation', 'Supports UPS for rescue operation', 'Comprehensive trip diagnostics'],
  true
);

-- Insert FJK1-B TRACTION MACHINE 325mm
INSERT INTO public.products (
  name_ko, name_en,
  description_ko, description_en,
  category_id,
  specifications,
  features_ko, features_en,
  is_active
) VALUES (
  'FJK1-B 트랙션 머신 325mm',
  'FJK1-B TRACTION MACHINE 325mm',
  '325mm 드라이브 시브를 갖춘 경량 트랙션 머신입니다. 2:1 서스펜션 비율과 DC110V 브레이크 시스템을 적용했습니다.',
  'Lightweight traction machine with 325mm drive sheave. Features 2:1 suspension ratio and DC110V brake system for reliable operation.',
  (SELECT id FROM categories WHERE name_en ILIKE '%traction%' LIMIT 1),
  '{"voltage": "380V", "suspension": "2:1", "brake": "DC110V 2x0.84A", "weight": "200kg", "maxLoad": "2000kg"}',
  ARRAY['325mm 드라이브 시브', '2:1 서스펜션 비율', 'DC110V 브레이크 시스템', '200kg 경량 설계', '최대 정하중 2000kg'],
  ARRAY['325mm diameter drive sheave', '2:1 suspension ratio', 'DC110V brake system', '200kg lightweight design', 'Maximum static load 2000kg'],
  true
);

-- Insert FJK1-B TRACTION MACHINE 400mm
INSERT INTO public.products (
  name_ko, name_en,
  description_ko, description_en,
  category_id,
  specifications,
  features_ko, features_en,
  is_active
) VALUES (
  'FJK1-B 트랙션 머신 400mm',
  'FJK1-B TRACTION MACHINE 400mm',
  '400mm 드라이브 시브를 갖춘 중부하용 트랙션 머신입니다. 285kg 견고한 구조로 최대 3000kg까지 지원합니다.',
  'Heavy-duty traction machine with 400mm drive sheave. Robust 285kg construction supports maximum static load up to 3000kg.',
  (SELECT id FROM categories WHERE name_en ILIKE '%traction%' LIMIT 1),
  '{"voltage": "380V", "suspension": "2:1", "brake": "DC110V 2x1.0A", "weight": "285kg", "maxLoad": "3000kg"}',
  ARRAY['400mm 드라이브 시브', '2:1 서스펜션 비율', 'DC110V 브레이크 시스템', '285kg 중부하 구조', '최대 정하중 3000kg'],
  ARRAY['400mm diameter drive sheave', '2:1 suspension ratio', 'DC110V brake system', 'Heavy-duty 285kg construction', 'Maximum static load 3000kg'],
  true
);

-- Insert FJK2-B450KG TRACTION MACHINE 240mm
INSERT INTO public.products (
  name_ko, name_en,
  description_ko, description_en,
  category_id,
  specifications,
  features_ko, features_en,
  is_active
) VALUES (
  'FJK2-B450KG 트랙션 머신 240mm',
  'FJK2-B450KG TRACTION MACHINE 240mm',
  '240mm 컴팩트 트랙션 머신으로 140kg 경량 설계입니다. F급 절연과 IP41 보호 등급을 제공합니다.',
  'Compact 240mm traction machine with lightweight 140kg design. Features F class insulation and IP41 protection rating.',
  (SELECT id FROM categories WHERE name_en ILIKE '%traction%' LIMIT 1),
  '{"voltage": "AC380V", "brake": "DC110V", "weight": "140kg", "duty": "S5-40%", "maxLoad": "2500kg", "protection": "IP41"}',
  ARRAY['140kg 컴팩트 설계', '싱글 랩 구성', 'F급 절연', 'IP41 보호 등급', '최대 정하중 2500kg', '이동 높이 <90m'],
  ARRAY['Compact 140kg design', 'Single wrap configuration', 'F class insulation', 'IP41 protection rating', 'Maximum static load 2500kg', 'Traveling height <90m'],
  true
);