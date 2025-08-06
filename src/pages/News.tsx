import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const News = () => {
  const { language, setLanguage } = useLanguage();

  const content = {
    ko: {
      title: "뉴스 및 공지사항",
      subtitle: "후지글로벌의 최신 소식과 업계 동향을 확인하세요",
      readMore: "자세히 보기",
      categories: {
        news: "뉴스",
        announcement: "공지사항", 
        technology: "기술",
        awards: "수상"
      },
      news: [
        {
          id: 1,
          title: "후지글로벌, 2024년 엘리베이터 안전 인증 획득",
          excerpt: "당사의 FCA-9000 시리즈가 국제 안전 표준 인증을 획득했습니다.",
          date: "2024-01-15",
          category: "awards",
          image: "/src/assets/company-building.jpg"
        },
        {
          id: 2,
          title: "AI 기반 엘리베이터 제어 시스템 출시",
          excerpt: "최신 AI 기술을 적용한 스마트 엘리베이터 제어 시스템을 공개했습니다.",
          date: "2024-01-10",
          category: "technology",
          image: "/src/assets/control-system.jpg"
        },
        {
          id: 3,
          title: "2024년 신제품 발표회 개최 예정",
          excerpt: "오는 2월 15일 서울에서 신제품 발표회를 개최할 예정입니다.",
          date: "2024-01-05",
          category: "announcement",
          image: "/src/assets/traction-machine.jpg"
        }
      ]
    },
    en: {
      title: "News & Announcements", 
      subtitle: "Stay updated with Fuji Global's latest news and industry trends",
      readMore: "Read More",
      categories: {
        news: "News",
        announcement: "Announcement",
        technology: "Technology", 
        awards: "Awards"
      },
      news: [
        {
          id: 1,
          title: "Fuji Global Receives 2024 Elevator Safety Certification",
          excerpt: "Our FCA-9000 Series has obtained international safety standard certification.",
          date: "2024-01-15",
          category: "awards",
          image: "/src/assets/company-building.jpg"
        },
        {
          id: 2,
          title: "AI-Based Elevator Control System Launch",
          excerpt: "We unveiled our smart elevator control system with the latest AI technology.",
          date: "2024-01-10", 
          category: "technology",
          image: "/src/assets/control-system.jpg"
        },
        {
          id: 3,
          title: "2024 New Product Launch Event Scheduled",
          excerpt: "A new product launch event will be held in Seoul on February 15th.",
          date: "2024-01-05",
          category: "announcement", 
          image: "/src/assets/traction-machine.jpg"
        }
      ]
    }
  };

  const t = content[language];

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "awards": return "default";
      case "technology": return "secondary";
      case "announcement": return "outline";
      default: return "outline";
    }
  };

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

        {/* News Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.news.map((article) => (
                <Card key={article.id} className="industrial-card hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-video bg-muted">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.date}
                      </div>
                      <Badge variant={getCategoryBadgeVariant(article.category)}>
                        {t.categories[article.category as keyof typeof t.categories]}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                    <Button variant="outline" className="w-full group">
                      {t.readMore}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default News;