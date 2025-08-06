import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Award, Target, Globe, Shield, CheckCircle, Star } from "lucide-react";
import aboutIndustrial from "@/assets/about-industrial.jpg";
import aboutTeam from "@/assets/about-team.jpg";
import fujiHeadquarters from "@/assets/fuji-headquarters.jpg";
import awardsCertifications from "@/assets/awards-certifications.jpg";
import globalPresence from "@/assets/global-presence.jpg";

const About = () => {
  const { language, setLanguage } = useLanguage();

  const content = {
    ko: {
      title: "회사소개",
      subtitle: "엘리베이터 기술의 혁신을 선도하는 FUJI Global Korea",
      history: {
        title: "회사 연혁",
        items: [
          { year: "1995", text: "FUJI Global Korea 설립" },
          { year: "2000", text: "첫 번째 컨트롤 시스템 출시" },
          { year: "2010", text: "견인기 기술 개발" },
          { year: "2020", text: "IoT 기반 스마트 시스템 도입" },
          { year: "2024", text: "AI 통합 엘리베이터 솔루션 출시" }
        ]
      },
      stats: [
        { icon: Building, label: "설치 완료", value: "5,000+" },
        { icon: Users, label: "직원 수", value: "200+" },
        { icon: Award, label: "수상 경력", value: "15+" },
        { icon: Target, label: "서비스 년수", value: "29년" }
      ],
      mission: {
        title: "미션 & 비전",
        mission: "안전하고 효율적인 엘리베이터 기술로 더 나은 도시 환경을 만듭니다.",
        vision: "글로벌 엘리베이터 기술 혁신의 선두주자가 되겠습니다."
      },
      credentials: {
        title: "자격증명 및 성과",
        items: [
          { icon: Award, title: "ISO 9001:2015 인증", desc: "국제 품질경영시스템 표준 인증" },
          { icon: Shield, title: "안전 우수상", desc: "엘리베이터 업계 뛰어난 안전 기록" },
          { icon: Star, title: "혁신 리더", desc: "최첨단 엘리베이터 기술력 인정" },
          { icon: Globe, title: "글로벌 파트너십", desc: "전 세계 전략적 파트너십 구축" }
        ]
      },
      globalPresence: {
        title: "글로벌 현황",
        description: "FUJI Global Korea는 아시아, 유럽, 아메리카 등 여러 국가에서 첨단 엘리베이터 솔루션을 제공하며 글로벌 고객들에게 서비스하고 있습니다."
      }
    },
    en: {
      title: "About Us",
      subtitle: "FUJI Global Korea leading innovation in elevator technology",
      history: {
        title: "Company History",
        items: [
          { year: "1995", text: "FUJI Global Korea established" },
          { year: "2000", text: "First control system launched" },
          { year: "2010", text: "Traction machine technology developed" },
          { year: "2020", text: "IoT-based smart systems introduced" },
          { year: "2024", text: "AI-integrated elevator solutions launched" }
        ]
      },
      stats: [
        { icon: Building, label: "Installations", value: "5,000+" },
        { icon: Users, label: "Employees", value: "200+" },
        { icon: Award, label: "Awards", value: "15+" },
        { icon: Target, label: "Years of Service", value: "29 Years" }
      ],
      mission: {
        title: "Mission & Vision",
        mission: "Creating better urban environments through safe and efficient elevator technology.",
        vision: "To become a global leader in elevator technology innovation."
      },
      credentials: {
        title: "Credentials & Achievements",
        items: [
          { icon: Award, title: "ISO 9001:2015 Certification", desc: "International quality management standards" },
          { icon: Shield, title: "Safety Excellence Award", desc: "Outstanding safety record in elevator industry" },
          { icon: Star, title: "Innovation Leader", desc: "Recognized for cutting-edge elevator technology" },
          { icon: Globe, title: "Global Partnership", desc: "Strategic partnerships worldwide" }
        ]
      },
      globalPresence: {
        title: "Global Presence",
        description: "FUJI Global Korea operates in multiple countries, serving clients across Asia, Europe, and the Americas with our advanced elevator solutions."
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${aboutIndustrial})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/70"></div>
          </div>
          <div className="relative container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">{t.subtitle}</p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {t.stats.map((stat, index) => (
                <Card key={index} className="industrial-card text-center">
                  <CardContent className="p-6">
                    <div className="p-3 bg-primary/10 rounded-full mx-auto mb-4 w-fit">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Headquarters & Credentials */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img 
                  src={fujiHeadquarters} 
                  alt="FUJI Global Headquarters" 
                  className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">{t.credentials.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {t.credentials.items.map((item, index) => (
                    <Card key={index} className="industrial-card">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">{t.globalPresence.title}</h2>
                <p className="text-lg leading-relaxed mb-6">{t.globalPresence.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="industrial-card">
                    <CardContent className="p-4">
                      <CheckCircle className="h-6 w-6 text-primary mb-2" />
                      <h4 className="font-bold mb-1">{language === 'ko' ? '아시아 태평양' : 'Asia Pacific'}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ko' ? '한국, 일본, 중국, 동남아시아' : 'Korea, Japan, China, Southeast Asia'}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="industrial-card">
                    <CardContent className="p-4">
                      <CheckCircle className="h-6 w-6 text-primary mb-2" />
                      <h4 className="font-bold mb-1">{language === 'ko' ? '유럽 & 아메리카' : 'Europe & Americas'}</h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'ko' ? '독일, 프랑스, 미국, 캐나다' : 'Germany, France, USA, Canada'}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div>
                <img 
                  src={globalPresence} 
                  alt="Global Presence" 
                  className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src={aboutTeam} 
                  alt="Professional Team" 
                  className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">{t.history.title}</h2>
                <div className="space-y-4">
                  {t.history.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <Badge variant="secondary" className="text-lg px-3 py-1 min-w-fit">
                        {item.year}
                      </Badge>
                      <Card className="flex-1 industrial-card">
                        <CardContent className="p-4">
                          <p className="text-base">{item.text}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Certifications Display */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">
                  {language === 'ko' ? '수상 및 인증' : 'Awards & Certifications'}
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  {language === 'ko' 
                    ? 'FUJI Global Korea는 품질과 혁신에 대한 지속적인 노력으로 다양한 국제 인증과 상을 받았습니다.'
                    : 'FUJI Global Korea has received various international certifications and awards for our continuous efforts in quality and innovation.'
                  }
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">ISO 9001</div>
                    <div className="text-sm text-muted-foreground">Quality Management</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15+</div>
                    <div className="text-sm text-muted-foreground">Industry Awards</div>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src={awardsCertifications} 
                  alt="Awards and Certifications" 
                  className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t.mission.title}</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="industrial-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    {language === 'ko' ? '미션' : 'Mission'}
                  </h3>
                  <p className="text-lg leading-relaxed">{t.mission.mission}</p>
                </CardContent>
              </Card>
              <Card className="industrial-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    {language === 'ko' ? '비전' : 'Vision'}
                  </h3>
                  <p className="text-lg leading-relaxed">{t.mission.vision}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default About;