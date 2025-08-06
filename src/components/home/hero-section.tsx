import React from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  language: 'ko' | 'en';
}

const content = {
  ko: {
    title: "엘리베이터 기술의",
    titleHighlight: "미래를 선도합니다",
    subtitle: "FUJI Global Korea는 최첨단 제어 시스템과 견인기 기술로 안전하고 효율적인 수직 교통 솔루션을 제공합니다.",
    cta1: "제품 보기",
    cta2: "회사 소개",
    stats: [
      { number: "25+", label: "년의 경험" },
      { number: "10,000+", label: "설치 완료" },
      { number: "50+", label: "국가 진출" },
      { number: "99.9%", label: "신뢰성" }
    ]
  },
  en: {
    title: "Leading the Future of",
    titleHighlight: "Elevator Technology",
    subtitle: "FUJI Global Korea provides safe and efficient vertical transportation solutions with cutting-edge control systems and traction machine technology.",
    cta1: "View Products",
    cta2: "About Us",
    stats: [
      { number: "25+", label: "Years Experience" },
      { number: "10,000+", label: "Installations" },
      { number: "50+", label: "Countries" },
      { number: "99.9%", label: "Reliability" }
    ]
  }
};

export const HeroSection = ({ language }: HeroSectionProps) => {
  const t = content[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Industrial elevator technology" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block">{t.title}</span>
            <span className="block text-gradient-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-orange-400">
              {t.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="btn-industrial text-lg px-8 py-4 glow-effect"
            >
              {t.cta1}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="glass-morphism text-white border-white/30 hover:bg-white/10 text-lg px-8 py-4"
            >
              <Play className="mr-2 h-5 w-5" />
              {t.cta2}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat, index) => (
              <div key={index} className="metric-display rounded-lg p-6 glass-morphism">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};