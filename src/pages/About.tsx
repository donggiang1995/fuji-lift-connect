import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Award, Target } from "lucide-react";
import aboutIndustrial from "@/assets/about-industrial.jpg";
import aboutTeam from "@/assets/about-team.jpg";

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
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80"></div>
          </div>
          <div className="relative container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient-primary">{t.title}</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">{t.subtitle}</p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {t.stats.map((stat, index) => (
                <Card key={index} className="industrial-card text-center glow-effect">
                  <CardContent className="p-6">
                    <div className="p-3 bg-gradient-primary rounded-full mx-auto mb-4 w-fit">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team & History Section */}
        <section className="py-16 bg-gradient-industrial">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img 
                  src={aboutTeam} 
                  alt="Professional Team" 
                  className="rounded-lg shadow-industrial w-full h-[400px] object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">{t.history.title}</h2>
                <div className="space-y-6">
                  {t.history.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <Badge variant="secondary" className="text-lg px-4 py-2 min-w-fit bg-primary text-white">
                        {item.year}
                      </Badge>
                      <Card className="flex-1 industrial-card">
                        <CardContent className="p-4">
                          <p className="text-lg">{item.text}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient-primary">{t.mission.title}</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="industrial-card glow-effect">
                <CardContent className="p-8 bg-gradient-secondary">
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    {language === 'ko' ? '미션' : 'Mission'}
                  </h3>
                  <p className="text-lg leading-relaxed">{t.mission.mission}</p>
                </CardContent>
              </Card>
              <Card className="industrial-card glow-effect">
                <CardContent className="p-8 bg-gradient-secondary">
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