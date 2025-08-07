import React from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/modern-building-hero.jpg";
import elevatorInstallation from "@/assets/elevator-installation.jpg";
import elevatorControlRoom from "@/assets/elevator-control-room.jpg";
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
    stats: [{
      number: "25+",
      label: "년의 경험"
    }, {
      number: "10,000+",
      label: "설치 완료"
    }, {
      number: "50+",
      label: "국가 진출"
    }, {
      number: "99.9%",
      label: "신뢰성"
    }]
  },
  en: {
    title: "Leading the Future of",
    titleHighlight: "Elevator Technology",
    subtitle: "FUJI Global Korea provides safe and efficient vertical transportation solutions with cutting-edge control systems and traction machine technology.",
    cta1: "View Products",
    cta2: "About Us",
    stats: [{
      number: "25+",
      label: "Years Experience"
    }, {
      number: "10,000+",
      label: "Installations"
    }, {
      number: "50+",
      label: "Countries"
    }, {
      number: "99.9%",
      label: "Reliability"
    }]
  }
};
export const HeroSection = ({
  language
}: HeroSectionProps) => {
  const t = content[language];
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Industrial elevator technology" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-2 text-center text-white">
        <div className="max-w-6xl mx-auto">
          {/* Main Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block">{t.title}</span>
              <span className="block text-gradient-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-orange-400">
                {t.titleHighlight}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base md:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8">
              {t.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
              <Button size="lg" className="btn-industrial text-base px-6 py-3 glow-effect">
                {t.cta1}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="glass-morphism border-white/30 text-base py-3 bg-slate-200 hover:bg-slate-100 text-slate-900 px-[40px]">
                <Play className="mr-2 h-4 w-4" />
                {t.cta2}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {t.stats.map((stat, index) => <div key={index} className="metric-display rounded-lg p-4 glass-morphism bg-slate-800">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm text-gray-300 bg-blue-500">
                    {stat.label}
                  </div>
                </div>)}
            </div>

            {/* Featured Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="relative group overflow-hidden rounded-lg">
                <img src={elevatorInstallation} alt="Elevator Installation" className="w-full h-64 object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-lg">
                    {language === 'ko' ? '전문 설치 서비스' : 'Professional Installation'}
                  </h4>
                  <p className="text-sm text-gray-200">
                    {language === 'ko' ? '최첨단 기술로 안전한 설치' : 'Safe installation with cutting-edge technology'}
                  </p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg">
                <img src={elevatorControlRoom} alt="Control Room" className="w-full h-64 object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold text-lg">
                    {language === 'ko' ? '첨단 제어 시스템' : 'Advanced Control Systems'}
                  </h4>
                  <p className="text-sm text-gray-200">
                    {language === 'ko' ? '스마트 모니터링 및 제어' : 'Smart monitoring and control'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>;
};