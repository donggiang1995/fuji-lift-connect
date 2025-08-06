import React from "react";
import { ArrowRight, Wrench, Settings, Zap, Phone, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ServicesSectionProps {
  language: 'ko' | 'en';
}

const content = {
  ko: {
    title: "서비스",
    subtitle: "전문적인 엘리베이터 서비스로 안전하고 효율적인 운영을 보장합니다",
    viewAllServices: "모든 서비스 보기",
    services: [
      {
        icon: Wrench,
        title: "설치 서비스",
        description: "전문 기술진이 제공하는 안전하고 정확한 엘리베이터 설치",
        features: ["현장 조사", "전문 설치", "품질 검사"]
      },
      {
        icon: Settings,
        title: "유지보수",
        description: "정기적인 점검과 관리로 최적 성능을 유지",
        features: ["정기 점검", "예방 정비", "성능 최적화"]
      },
      {
        icon: Zap,
        title: "모더니제이션",
        description: "기존 엘리베이터를 최신 기술로 업그레이드",
        features: ["시스템 업그레이드", "에너지 효율", "안전 강화"]
      },
      {
        icon: Phone,
        title: "응급 수리",
        description: "24시간 응급 상황 대응으로 신속한 문제 해결",
        features: ["24시간 대응", "긴급 출동", "원격 진단"]
      },
      {
        icon: Users,
        title: "컨설팅",
        description: "엘리베이터 프로젝트 전반에 대한 전문 컨설팅",
        features: ["프로젝트 기획", "기술 자문", "비용 최적화"]
      },
      {
        icon: Shield,
        title: "안전 점검",
        description: "정기적인 안전 점검으로 사고 예방과 안전 보장",
        features: ["안전 점검", "위험 분석", "개선 방안"]
      }
    ]
  },
  en: {
    title: "Services",
    subtitle: "Professional elevator services ensuring safe and efficient operation",
    viewAllServices: "View All Services",
    services: [
      {
        icon: Wrench,
        title: "Installation Service",
        description: "Safe and precise elevator installation by professional technicians",
        features: ["Site survey", "Professional installation", "Quality inspection"]
      },
      {
        icon: Settings,
        title: "Maintenance",
        description: "Regular inspection and management to maintain optimal performance",
        features: ["Regular inspection", "Preventive maintenance", "Performance optimization"]
      },
      {
        icon: Zap,
        title: "Modernization",
        description: "Upgrade existing elevators with latest technology",
        features: ["System upgrade", "Energy efficiency", "Safety enhancement"]
      },
      {
        icon: Phone,
        title: "Emergency Repair",
        description: "24-hour emergency response providing rapid problem resolution",
        features: ["24-hour response", "Emergency dispatch", "Remote diagnosis"]
      },
      {
        icon: Users,
        title: "Consulting",
        description: "Professional consulting for all aspects of elevator projects",
        features: ["Project planning", "Technical advisory", "Cost optimization"]
      },
      {
        icon: Shield,
        title: "Safety Inspection",
        description: "Regular safety inspections to prevent accidents and ensure safety",
        features: ["Safety inspection", "Risk analysis", "Improvement plans"]
      }
    ]
  }
};

export const ServicesSection = ({ language }: ServicesSectionProps) => {
  const t = content[language];
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {t.services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="industrial-card hover:shadow-lg transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      <IconComponent className="h-6 w-6 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Services Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="btn-industrial"
            onClick={() => navigate('/services')}
          >
            {t.viewAllServices}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};