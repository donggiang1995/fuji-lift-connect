import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SerialSearchSection } from "@/components/home/serial-search-section";
import { useLanguage } from "@/hooks/use-language";

const SerialSearch = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />
      <main className="pt-16">
        <SerialSearchSection language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
};

export default SerialSearch;