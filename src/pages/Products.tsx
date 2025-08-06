import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/hooks/use-language";
import { useProducts } from "@/hooks/use-products";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Cpu, Cog, Zap, Shield, Settings, MonitorSpeaker } from "lucide-react";

const Products = () => {
  const { language, setLanguage } = useLanguage();
  const { products, categories, loading } = useProducts();

  const content = {
    ko: {
      title: "제품",
      subtitle: "최첨단 엘리베이터 기술 솔루션",
      tabs: {
        control: "제어 시스템",
        traction: "견인기"
      },
      products: {
        control: [
          {
            id: 1,
            name: "FCA-9000 Series",
            image: "/placeholder.svg",
            description: "차세대 엘리베이터 제어판으로 첨단 터치스크린과 AI 기반 최적화 기능을 제공합니다.",
            specifications: {
              "전압": "AC 220V/380V",
              "주파수": "50/60Hz", 
              "속도": "최대 3.0m/s",
              "정원": "최대 2,000kg",
              "층수": "최대 40층"
            },
            features: ["AI 최적화", "터치스크린", "에너지 효율", "원격 모니터링"]
          },
          {
            id: 2,
            name: "SCP-2024 Control Panel",
            image: "/placeholder.svg", 
            description: "최신 기술을 적용한 사용자 친화적 제어판으로 직관적인 인터페이스를 제공합니다.",
            specifications: {
              "전압": "DC 24V",
              "통신": "CAN Bus",
              "디스플레이": "7인치 컬러 LCD",
              "메모리": "32GB 내장",
              "인증": "CE, UL"
            },
            features: ["사용자 친화적", "컬러 디스플레이", "CAN 통신", "클라우드 연동"]
          }
        ],
        traction: [
          {
            id: 3,
            name: "TM-800S Traction Machine",
            image: "/placeholder.svg",
            description: "고효율 모터와 컴팩트한 디자인으로 에너지 절약 기능을 제공하는 견인기입니다.",
            specifications: {
              "출력": "7.5kW",
              "속도": "1.75m/s",
              "효율": "92%",
              "소음": "<60dB",
              "무게": "450kg"
            },
            features: ["고효율 모터", "컴팩트 설계", "저소음", "에너지 절약"]
          }
        ]
      },
      viewDetails: "자세히 보기",
      close: "닫기"
    },
    en: {
      title: "Products",
      subtitle: "Cutting-edge elevator technology solutions",
      tabs: {
        control: "Control Systems",
        traction: "Traction Machines"
      },
      products: {
        control: [
          {
            id: 1,
            name: "FCA-9000 Series",
            image: "/placeholder.svg",
            description: "Next-generation elevator control panel with advanced touchscreen and AI-based optimization features.",
            specifications: {
              "Voltage": "AC 220V/380V",
              "Frequency": "50/60Hz",
              "Speed": "Up to 3.0m/s", 
              "Capacity": "Up to 2,000kg",
              "Floors": "Up to 40 floors"
            },
            features: ["AI Optimization", "Touchscreen", "Energy Efficient", "Remote Monitoring"]
          },
          {
            id: 2,
            name: "SCP-2024 Control Panel",
            image: "/placeholder.svg",
            description: "Latest technology user-friendly control panel with intuitive interface.",
            specifications: {
              "Voltage": "DC 24V",
              "Communication": "CAN Bus",
              "Display": "7-inch Color LCD",
              "Memory": "32GB Built-in",
              "Certification": "CE, UL"
            },
            features: ["User-friendly", "Color Display", "CAN Communication", "Cloud Integration"]
          }
        ],
        traction: [
          {
            id: 3,
            name: "TM-800S Traction Machine", 
            image: "/placeholder.svg",
            description: "High-efficiency motor with compact design providing energy-saving features.",
            specifications: {
              "Power": "7.5kW",
              "Speed": "1.75m/s",
              "Efficiency": "92%",
              "Noise": "<60dB",
              "Weight": "450kg"
            },
            features: ["High Efficiency Motor", "Compact Design", "Low Noise", "Energy Saving"]
          }
        ]
      },
      viewDetails: "View Details",
      close: "Close"
    }
  };

  const t = content[language];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={setLanguage} />
        <main className="pt-16 md:pt-20">
          <div className="container mx-auto px-4 py-8 text-center">
            <div className="text-xl">Loading products...</div>
          </div>
        </main>
        <Footer language={language} />
      </div>
    );
  }

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

        {/* Products Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {categories.length > 0 ? (
              <Tabs defaultValue={categories[0]?.id} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  {categories.slice(0, 2).map((category) => (
                    <TabsTrigger key={category.id} value={category.id} className="text-lg py-3">
                      <Cpu className="h-5 w-5 mr-2" />
                      {language === 'ko' ? category.name_ko : category.name_en}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {products
                        .filter(product => product.category_id === category.id)
                        .map((product) => (
                          <Card key={product.id} className="industrial-card hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                                {product.image_url ? (
                                  <img 
                                    src={product.image_url} 
                                    alt={language === 'ko' ? product.name_ko : product.name_en}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <MonitorSpeaker className="h-16 w-16 text-muted-foreground" />
                                )}
                              </div>
                              <h3 className="text-xl font-bold mb-3">
                                {language === 'ko' ? product.name_ko : product.name_en}
                              </h3>
                              <p className="text-muted-foreground mb-4 line-clamp-3">
                                {language === 'ko' ? product.description_ko : product.description_en}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {(language === 'ko' ? product.features_ko : product.features_en)
                                  ?.slice(0, 2).map((feature, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">{feature}</Badge>
                                  ))}
                              </div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="w-full">
                                    {t.viewDetails}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <DialogHeader>
                                    <DialogTitle className="text-2xl">
                                      {language === 'ko' ? product.name_ko : product.name_en}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                      <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                                        {product.image_url ? (
                                          <img 
                                            src={product.image_url} 
                                            alt={language === 'ko' ? product.name_ko : product.name_en}
                                            className="w-full h-full object-cover rounded-lg"
                                          />
                                        ) : (
                                          <MonitorSpeaker className="h-24 w-24 text-muted-foreground" />
                                        )}
                                      </div>
                                      <p className="text-muted-foreground">
                                        {language === 'ko' ? product.description_ko : product.description_en}
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="font-bold mb-3">
                                        {language === 'ko' ? '주요 사양' : 'Specifications'}
                                      </h4>
                                      <div className="space-y-2 mb-6">
                                        {Object.entries(product.specifications || {}).map(([key, value]) => (
                                          <div key={key} className="flex justify-between">
                                            <span className="text-muted-foreground">{key}:</span>
                                            <span>{String(value)}</span>
                                          </div>
                                        ))}
                                      </div>
                                      <h4 className="font-bold mb-3">
                                        {language === 'ko' ? '주요 기능' : 'Features'}
                                      </h4>
                                      <div className="flex flex-wrap gap-2">
                                        {(language === 'ko' ? product.features_ko : product.features_en)
                                          ?.map((feature, idx) => (
                                            <Badge key={idx} variant="secondary">{feature}</Badge>
                                          ))}
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No products available</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default Products;