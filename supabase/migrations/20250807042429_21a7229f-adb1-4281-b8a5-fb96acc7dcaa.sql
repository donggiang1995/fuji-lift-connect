-- Merge FJE1 duplicates: keep the one with image, update it with complete info, delete the duplicate
UPDATE products 
SET 
  description_ko = '원격 기술 지원과 IoT 모니터링 기능을 갖춘 스마트 제어 캐비닛입니다. 50dBA 미만의 저소음 설계와 자동 균형 조정 기능을 제공합니다.',
  description_en = 'Smart control cabinet with remote technical support and IoT monitoring capabilities. Features noise reduction design under 50dBA and automatic balance coefficient tuning.',
  specifications = '{"floors": "Up to 48 floors", "communication": "IoT enabled", "noise": "< 50dBA", "support": "Remote technical support"}',
  features_ko = ARRAY['APP을 통한 원격 기술 지원', 'IoT를 통한 원격 모니터링', '통신 인코더 지원', '자동 균형 계수 조정', '50dBA 미만 저소음 설계'],
  features_en = ARRAY['Remote technical support through APP', 'Remote monitoring through the IoT', 'Communication encoder supported', 'Balance coefficient auto-tuning', 'Noise reduction design < 50dBA'],
  updated_at = now()
WHERE id = 'e48d2f44-acf8-4e93-ba99-c539c9001075';

-- Delete FJE1 duplicate
DELETE FROM products WHERE id = '032ab307-f354-4bb3-80e6-6b725449e063';

-- Merge FJE2 duplicates: keep the one with image, update it with complete info, delete the duplicate  
UPDATE products 
SET 
  description_ko = '48층 표준 지원과 이중 온보드 그룹 제어 기능을 갖춘 고급 제어 캐비닛입니다. 자동 도어 제어와 UPS 백업 시스템을 지원합니다.',
  description_en = 'Advanced control cabinet supporting 48 floors standard with duplex onboard group control. Features automatic door control and UPS backup system support.',
  specifications = '{"floors": "48 floors standard", "communication": "CANbus serial", "control": "Duplex group control", "backup": "UPS support"}',
  features_ko = ARRAY['표준: 48층, 풀 콜렉티브 (풀 시리얼 연결)', '이중 온보드 그룹 제어 (CANbus 시리얼 통신)', '자동 도어 제어 모드', '선택 가능한 소방관 운전', '구조 운전을 위한 1상 220V UPS 지원', '포괄적인 운행 진단'],
  features_en = ARRAY['Standard: 48 floors, full collective (full serial connection)', 'Duplex onboard group control (CANbus serial communication)', 'Automatic door control mode', 'Selectable fireman operation', 'Supports 1 ph. 220 Vac UPS for rescue operation', 'Comprehensive trip diagnostics'],
  updated_at = now()
WHERE id = '26c8294e-b0bb-4f40-82da-a53d4b404c4b';

-- Delete FJE2 duplicate
DELETE FROM products WHERE id = '15eb02d9-7667-47e7-abb2-b03a0b232b34';

-- Merge FJK1-B 325mm: update the old one with new info and image, delete the new duplicate
UPDATE products 
SET 
  name_en = 'FJK1-B TRACTION MACHINE 325mm',
  name_ko = 'FJK1-B 트랙션 머신 325mm',
  description_ko = '325mm 드라이브 시브를 갖춘 경량 트랙션 머신입니다. 2:1 서스펜션 비율과 DC110V 브레이크 시스템을 적용했습니다.',
  description_en = 'Lightweight traction machine with 325mm drive sheave. Features 2:1 suspension ratio and DC110V brake system for reliable operation.',
  specifications = '{"voltage": "380V", "suspension": "2:1", "brake": "DC110V 2x0.84A", "weight": "200kg", "maxLoad": "2000kg"}',
  features_ko = ARRAY['325mm 직경 드라이브 시브', '2:1 서스펜션 비율', 'DC110V 브레이크 시스템', '200kg 경량 설계', '최대 정적 하중 2000kg'],
  features_en = ARRAY['325mm diameter drive sheave', '2:1 suspension ratio', 'DC110V brake system', '200kg lightweight design', 'Maximum static load 2000kg'],
  updated_at = now()
WHERE id = 'c36e7f5f-2454-43a8-bca9-32bdddd72544';

-- Delete FJK1-B 325mm duplicate
DELETE FROM products WHERE id = '8d0619c6-9d6e-4207-956a-cba728a69f75';

-- Merge FJK1-B 400mm: update the old one with new info and image, delete the new duplicate
UPDATE products 
SET 
  name_en = 'FJK1-B TRACTION MACHINE 400mm',
  name_ko = 'FJK1-B 트랙션 머신 400mm',
  description_ko = '400mm 드라이브 시브를 갖춘 중부하용 트랙션 머신입니다. 285kg 견고한 구조로 최대 3000kg까지 지원합니다.',
  description_en = 'Heavy-duty traction machine with 400mm drive sheave. Robust 285kg construction supports maximum static load up to 3000kg.',
  specifications = '{"voltage": "380V", "suspension": "2:1", "brake": "DC110V 2x1.0A", "weight": "285kg", "maxLoad": "3000kg"}',
  features_ko = ARRAY['400mm 직경 드라이브 시브', '2:1 서스펜션 비율', 'DC110V 브레이크 시스템', '중부하용 285kg 구조', '최대 정적 하중 3000kg'],
  features_en = ARRAY['400mm diameter drive sheave', '2:1 suspension ratio', 'DC110V brake system', 'Heavy-duty 285kg construction', 'Maximum static load 3000kg'],
  updated_at = now()
WHERE id = 'a395963b-950a-420d-8872-bfa8d07b1f36';

-- Delete FJK1-B 400mm duplicate
DELETE FROM products WHERE id = '6ff4b541-7c14-4635-8334-efc357d96244';

-- Merge FJK2-B450KG 240mm: update the old one with new info, delete the new duplicate
UPDATE products 
SET 
  name_en = 'FJK2-B TRACTION MACHINE 240mm',
  name_ko = 'FJK2-B 트랙션 머신 240mm',
  description_ko = '240mm 컴팩트 트랙션 머신으로 140kg 경량 설계입니다. F급 절연과 IP41 보호 등급을 제공합니다.',
  description_en = 'Compact 240mm traction machine with lightweight 140kg design. Features F class insulation and IP41 protection rating.',
  specifications = '{"voltage": "AC380V", "brake": "DC110V", "weight": "140kg", "duty": "S5-40%", "maxLoad": "2500kg", "protection": "IP41"}',
  features_ko = ARRAY['컴팩트 140kg 설계', '싱글 랩 구성', 'F급 절연', 'IP41 보호 등급', '최대 정적 하중 2500kg', '이동 높이 <90m'],
  features_en = ARRAY['Compact 140kg design', 'Single wrap configuration', 'F class insulation', 'IP41 protection rating', 'Maximum static load 2500kg', 'Traveling height <90m'],
  updated_at = now()
WHERE id = 'fffec700-aa3e-49e4-8654-5d5918024ebe';

-- Delete FJK2-B450KG 240mm duplicate
DELETE FROM products WHERE id = '545de494-1797-4219-a137-531c0796d531';

-- Rename FJK2 – B630-800KG (240mm) to FJK2 – B630-800KG TRACTION 240mm
UPDATE products 
SET 
  name_en = 'FJK2 – B630-800KG TRACTION 240mm',
  name_ko = 'FJK2 – B630-800KG 트랙션 240mm',
  updated_at = now()
WHERE id = '637f0961-811d-4cc6-87d5-1318b7fc579d';

-- Rename FJK2 – B630KG (320mm) to FJK2-B630 TRACTION MACHINE 320mm
UPDATE products 
SET 
  name_en = 'FJK2-B630 TRACTION MACHINE 320mm',
  name_ko = 'FJK2-B630 트랙션 머신 320mm',
  updated_at = now()
WHERE id = '8a757d07-f40c-4fed-9a84-6dab14467932';