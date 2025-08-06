import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { SerialSearchSection } from "@/components/home/serial-search-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { ServicesSection } from "@/components/home/services-section";
import { useLanguage } from "@/hooks/use-language";

const Index = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="pt-16 md:pt-20">
        <HeroSection language={language} />
        <SerialSearchSection language={language} />
        <FeaturedProducts language={language} />
        <ServicesSection language={language} />
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default Index;
