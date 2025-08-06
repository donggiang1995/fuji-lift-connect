-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ko TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ko TEXT,
  description_en TEXT,
  icon TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ko TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ko TEXT,
  description_en TEXT,
  image_url TEXT,
  category_id UUID NOT NULL REFERENCES public.categories(id),
  specifications JSONB DEFAULT '{}',
  features_ko TEXT[] DEFAULT '{}',
  features_en TEXT[] DEFAULT '{}',
  price DECIMAL(10,2),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_inquiries table
CREATE TABLE public.contact_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create news table
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ko TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_ko TEXT,
  content_en TEXT,
  excerpt_ko TEXT,
  excerpt_en TEXT,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access (categories and products are publicly viewable)
CREATE POLICY "Categories are publicly viewable" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Products are publicly viewable" ON public.products FOR SELECT USING (true);
CREATE POLICY "News are publicly viewable" ON public.news FOR SELECT USING (is_published = true);

-- Contact inquiries can be inserted by anyone but not read
CREATE POLICY "Anyone can submit contact inquiries" ON public.contact_inquiries FOR INSERT WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON public.news
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample categories
INSERT INTO public.categories (name_ko, name_en, description_ko, description_en, icon) VALUES
  ('제어 시스템', 'Control Systems', '엘리베이터 제어판 및 시스템', 'Elevator control panels and systems', 'cpu'),
  ('견인기', 'Traction Machines', '엘리베이터 견인기 및 모터', 'Elevator traction machines and motors', 'cog');

-- Insert sample products
INSERT INTO public.products (name_ko, name_en, description_ko, description_en, category_id, specifications, features_ko, features_en) VALUES
  (
    'FCA-9000 시리즈',
    'FCA-9000 Series',
    '차세대 엘리베이터 제어판으로 첨단 터치스크린과 AI 기반 최적화 기능을 제공합니다.',
    'Next-generation elevator control panel with advanced touchscreen and AI-based optimization features.',
    (SELECT id FROM public.categories WHERE name_en = 'Control Systems'),
    '{"전압": "AC 220V/380V", "주파수": "50/60Hz", "속도": "최대 3.0m/s", "정원": "최대 2,000kg", "층수": "최대 40층"}',
    '{"AI 최적화", "터치스크린", "에너지 효율", "원격 모니터링"}',
    '{"AI Optimization", "Touchscreen", "Energy Efficient", "Remote Monitoring"}'
  ),
  (
    'SCP-2024 제어판',
    'SCP-2024 Control Panel',
    '최신 기술을 적용한 사용자 친화적 제어판으로 직관적인 인터페이스를 제공합니다.',
    'Latest technology user-friendly control panel with intuitive interface.',
    (SELECT id FROM public.categories WHERE name_en = 'Control Systems'),
    '{"전압": "DC 24V", "통신": "CAN Bus", "디스플레이": "7인치 컬러 LCD", "메모리": "32GB 내장", "인증": "CE, UL"}',
    '{"사용자 친화적", "컬러 디스플레이", "CAN 통신", "클라우드 연동"}',
    '{"User-friendly", "Color Display", "CAN Communication", "Cloud Integration"}'
  ),
  (
    'TM-800S 견인기',
    'TM-800S Traction Machine',
    '고효율 모터와 컴팩트한 디자인으로 에너지 절약 기능을 제공하는 견인기입니다.',
    'High-efficiency motor with compact design providing energy-saving features.',
    (SELECT id FROM public.categories WHERE name_en = 'Traction Machines'),
    '{"출력": "7.5kW", "속도": "1.75m/s", "효율": "92%", "소음": "<60dB", "무게": "450kg"}',
    '{"고효율 모터", "컴팩트 설계", "저소음", "에너지 절약"}',
    '{"High Efficiency Motor", "Compact Design", "Low Noise", "Energy Saving"}'
  );