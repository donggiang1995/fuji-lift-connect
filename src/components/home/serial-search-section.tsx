import React from "react";
import { SerialSearch } from "@/components/ui/serial-search";
import { Search, Database } from "lucide-react";

interface SerialSearchSectionProps {
  language: 'ko' | 'en';
}

const content = {
  ko: {
    title: "제품 시리얼 번호 조회",
    subtitle: "제품의 시리얼 번호를 입력하여 설치 정보와 상태를 확인하세요",
    placeholder: "시리얼 번호를 입력하세요..."
  },
  en: {
    title: "Product Serial Number Search",
    subtitle: "Enter your product's serial number to check installation information and status",
    placeholder: "Enter serial number..."
  }
};

export const SerialSearchSection = ({ language }: SerialSearchSectionProps) => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <div className="p-3 rounded-full bg-secondary/10">
                <Database className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {content[language].title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content[language].subtitle}
            </p>
          </div>

          {/* Search Panel */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border shadow-lg p-8">
            <div className="max-w-2xl mx-auto">
              <SerialSearch 
                placeholder={content[language].placeholder}
                onSearch={(serialNumber) => {
                  console.log('Searching for:', serialNumber);
                }}
                language={language}
              />
            </div>
            
            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-8 text-center">
              <div className="p-4 rounded-lg bg-primary/5">
                <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'ko' ? '실시간 조회' : 'Real-time Search'}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/5">
                <div className="text-2xl font-bold text-secondary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'ko' ? '정확한 정보' : 'Accurate Info'}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-accent/5">
                <div className="text-2xl font-bold text-accent mb-1">
                  {language === 'ko' ? '즉시' : 'Instant'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {language === 'ko' ? '결과 확인' : 'Results'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};