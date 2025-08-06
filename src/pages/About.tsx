import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Award, Target } from "lucide-react";

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
        <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-steel-dark">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">{t.subtitle}</p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {t.stats.map((stat, index) => (
                <Card key={index} className="industrial-card text-center">
                  <CardContent className="p-6">
                    <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t.history.title}</h2>
            <div className="max-w-4xl mx-auto">
              {t.history.items.map((item, index) => (
                <div key={index} className="flex items-center mb-8 last:mb-0">
                  <Badge variant="secondary" className="text-lg px-4 py-2 mr-6 min-w-fit">
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
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-background">
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