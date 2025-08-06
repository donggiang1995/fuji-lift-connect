import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Wrench, 
  Shield, 
  Clock, 
  Phone, 
  CheckCircle, 
  Settings,
  Zap,
  Users
} from "lucide-react";

const Services = () => {
  const { language, setLanguage } = useLanguage();

  const content = {
    ko: {
      title: "서비스",
      subtitle: "전문적인 엘리베이터 서비스로 안전하고 효율적인 운영을 보장합니다",
      contactUs: "문의하기",
      services: [
        {
          icon: Wrench,
          title: "설치 서비스",
          description: "전문 기술진이 제공하는 안전하고 정확한 엘리베이터 설치 서비스",
          features: [
            "현장 조사 및 설계",
            "전문 설치팀 파견",
            "품질 검사 및 테스트",
            "사용자 교육 제공"
          ]
        },
        {
          icon: Settings,
          title: "유지보수",
          description: "정기적인 점검과 관리로 엘리베이터의 최적 성능을 유지합니다",
          features: [
            "정기 점검 서비스",
            "예방 정비",
            "성능 최적화",
            "부품 교체"
          ]
        },
        {
          icon: Zap,
          title: "모더니제이션",
          description: "기존 엘리베이터를 최신 기술로 업그레이드하여 성능을 향상시킵니다",
          features: [
            "시스템 업그레이드",
            "에너지 효율 개선",
            "안전 기능 강화",
            "디자인 현대화"
          ]
        },
        {
          icon: Phone,
          title: "응급 수리",
          description: "24시간 응급 상황 대응으로 신속한 문제 해결을 제공합니다",
          features: [
            "24시간 콜센터",
            "긴급 출동 서비스",
            "원격 진단",
            "신속한 수리"
          ]
        },
        {
          icon: Users,
          title: "컨설팅",
          description: "엘리베이터 프로젝트 전반에 대한 전문적인 컨설팅을 제공합니다",
          features: [
            "프로젝트 기획",
            "기술 자문",
            "비용 최적화",
            "운영 가이드"
          ]
        },
        {
          icon: Shield,
          title: "안전 점검",
          description: "정기적인 안전 점검으로 사고를 예방하고 안전을 보장합니다",
          features: [
            "안전 기준 점검",
            "위험 요소 분석",
            "개선 방안 제시",
            "인증 지원"
          ]
        }
      ],
      whyChooseUs: {
        title: "왜 후지글로벌을 선택해야 할까요?",
        reasons: [
          {
            icon: Clock,
            title: "신속한 대응",
            description: "24시간 응급 서비스로 언제든지 도움을 받을 수 있습니다"
          },
          {
            icon: CheckCircle,
            title: "검증된 품질",
            description: "국제 표준 인증을 받은 고품질 서비스를 제공합니다"
          },
          {
            icon: Users,
            title: "전문 기술진",
            description: "풍부한 경험과 전문성을 갖춘 기술진이 서비스를 담당합니다"
          },
          {
            icon: Shield,
            title: "안전 보장",
            description: "엄격한 안전 기준을 준수하여 안전한 서비스를 제공합니다"
          }
        ]
      }
    },
    en: {
      title: "Services",
      subtitle: "Professional elevator services ensuring safe and efficient operation",
      contactUs: "Contact Us",
      services: [
        {
          icon: Wrench,
          title: "Installation Service",
          description: "Safe and precise elevator installation service provided by professional technicians",
          features: [
            "Site survey and design",
            "Professional installation team",
            "Quality inspection and testing", 
            "User training provided"
          ]
        },
        {
          icon: Settings,
          title: "Maintenance",
          description: "Regular inspection and management to maintain optimal elevator performance",
          features: [
            "Regular inspection service",
            "Preventive maintenance",
            "Performance optimization",
            "Parts replacement"
          ]
        },
        {
          icon: Zap,
          title: "Modernization",
          description: "Upgrade existing elevators with latest technology to improve performance",
          features: [
            "System upgrade",
            "Energy efficiency improvement",
            "Safety feature enhancement",
            "Design modernization"
          ]
        },
        {
          icon: Phone,
          title: "Emergency Repair",
          description: "24-hour emergency response providing rapid problem resolution",
          features: [
            "24-hour call center",
            "Emergency dispatch service",
            "Remote diagnosis",
            "Rapid repair"
          ]
        },
        {
          icon: Users,
          title: "Consulting",
          description: "Professional consulting for all aspects of elevator projects",
          features: [
            "Project planning",
            "Technical advisory",
            "Cost optimization",
            "Operation guide"
          ]
        },
        {
          icon: Shield,
          title: "Safety Inspection",
          description: "Regular safety inspections to prevent accidents and ensure safety",
          features: [
            "Safety standard inspection",
            "Risk factor analysis",
            "Improvement recommendations",
            "Certification support"
          ]
        }
      ],
      whyChooseUs: {
        title: "Why Choose Fuji Global?",
        reasons: [
          {
            icon: Clock,
            title: "Rapid Response",
            description: "24-hour emergency service ensures help is always available"
          },
          {
            icon: CheckCircle,
            title: "Proven Quality",
            description: "We provide high-quality services with international standard certification"
          },
          {
            icon: Users,
            title: "Expert Technicians",
            description: "Our services are handled by technicians with rich experience and expertise"
          },
          {
            icon: Shield,
            title: "Safety Assurance",
            description: "We provide safe services by adhering to strict safety standards"
          }
        ]
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-steel-dark">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">{t.subtitle}</p>
            <Button size="lg" variant="secondary">
              {t.contactUs}
            </Button>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="industrial-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.whyChooseUs.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.whyChooseUs.reasons.map((reason, index) => {
                const IconComponent = reason.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                    <p className="text-muted-foreground">{reason.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default Services;