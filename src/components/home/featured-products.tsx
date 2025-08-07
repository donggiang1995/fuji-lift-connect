import React from "react";
import { ArrowRight, Zap, Shield, Settings, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import controlSystemImg from "@/assets/control-system.jpg";
import tractionMachineImg from "@/assets/traction-machine.jpg";

interface FeaturedProductsProps {
  language: 'ko' | 'en';
}

const content = {
  ko: {
    title: "주요 제품",
    subtitle: "최첨단 기술로 제작된 FUJI의 엘리베이터 솔루션을 만나보세요",
    viewAll: "모든 제품 보기",
    learnMore: "자세히 보기",
    products: [
      {
        id: 1,
        name: "FJE1 제어판 시리즈",
        category: "제어 시스템",
        description: "고급 제어 패널을 갖춘 차세대 엘리베이터 제어 시스템",
        features: ["터치스크린 인터페이스", "에너지 효율적", "안전 인증", "IoT 연결"],
        image: "/lovable-uploads/84a2e098-f01c-41bb-876d-16be6c539c61.png",
        badge: "인기"
      },
      {
        id: 2,
        name: "FJK 권상기",
        category: "견인 시스템",
        description: "고효율 모터와 컴팩트한 디자인을 특징으로 하는 견인기",
        features: ["고효율 모터", "컴팩트 설계", "저소음 운전", "에너지 절약"],
        image: "/lovable-uploads/eb73adf2-67b1-4162-b279-fc121934e5cc.png",
        badge: "신제품"
      },
      {
        id: 3,
        name: "FJE2 제어판 시리즈",
        category: "제어 시스템",
        description: "최신 기술이 적용된 사용자 친화적 제어 패널",
        features: ["7인치 LCD", "다국어 지원", "IoT 연결", "터치 인터페이스"],
        image: "/lovable-uploads/cf4e5e75-caea-4ca9-8800-2324e0211427.png",
        badge: "최신"
      }
    ]
  },
  en: {
    title: "Featured Products",
    subtitle: "Discover FUJI's elevator solutions crafted with cutting-edge technology",
    viewAll: "View All Products",
    learnMore: "Learn More",
    products: [
      {
        id: 1,
        name: "FJE1 Control Panel Series",
        category: "Control System",
        description: "Next-generation elevator control system with advanced control panel",
        features: ["Touch Screen Interface", "Energy Efficient", "Safety Certified", "IoT Connected"],
        image: "/lovable-uploads/84a2e098-f01c-41bb-876d-16be6c539c61.png",
        badge: "Popular"
      },
      {
        id: 2,
        name: "FJK Traction Machine",
        category: "Traction System",
        description: "High efficiency traction machine with compact design and high durability",
        features: ["High Efficiency Motor", "Compact Design", "Low Noise Operation", "Energy Saving"],
        image: "/lovable-uploads/eb73adf2-67b1-4162-b279-fc121934e5cc.png",
        badge: "New"
      },
      {
        id: 3,
        name: "FJE2 Control Panel Series",
        category: "Control System",
        description: "Latest technology control panel with user-friendly interface",
        features: ["7-inch LCD", "Multi-language", "IoT Connectivity", "Touch Interface"],
        image: "/lovable-uploads/cf4e5e75-caea-4ca9-8800-2324e0211427.png",
        badge: "Latest"
      }
    ]
  }
};

const iconMap = {
  0: Cpu,
  1: Zap,
  2: Settings,
  3: Shield
};

export const FeaturedProducts = ({ language }: FeaturedProductsProps) => {
  const t = content[language];
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {t.products.map((product, index) => (
            <div key={product.id} className="industrial-card rounded-xl p-6 group">
              {/* Product Image */}
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge 
                  className="absolute top-4 left-4 bg-primary text-primary-foreground"
                >
                  {product.badge}
                </Badge>
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {product.category}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {product.features.map((feature, featureIndex) => {
                    const Icon = iconMap[featureIndex as keyof typeof iconMap] || Settings;
                    return (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <Icon className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Learn More Button */}
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  {t.learnMore}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="btn-industrial"
            onClick={() => navigate('/products')}
          >
            {t.viewAll}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};