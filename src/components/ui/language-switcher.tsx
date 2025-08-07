import React from "react";
import { Button } from "@/components/ui/button";
import flagsImage from "@/assets/flags.png";

interface LanguageSwitcherProps {
  currentLang: 'ko' | 'en';
  onLanguageChange: (lang: 'ko' | 'en') => void;
}

export const LanguageSwitcher = ({ currentLang, onLanguageChange }: LanguageSwitcherProps) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Korean Flag Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className={`glass-morphism p-2 ${currentLang === 'ko' ? 'ring-2 ring-primary' : ''}`}
        onClick={() => onLanguageChange('ko')}
      >
        <div className="w-6 h-4 bg-cover bg-center rounded-sm" 
             style={{ 
               backgroundImage: `url(/lovable-uploads/6893d7ec-ed59-40ec-8a5f-8b821b1271f1.png)`
             }}
        />
      </Button>
      
      {/* English Flag Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className={`glass-morphism p-2 ${currentLang === 'en' ? 'ring-2 ring-primary' : ''}`}
        onClick={() => onLanguageChange('en')}
      >
        <div className="w-6 h-4 bg-cover bg-center rounded-sm" 
             style={{ 
               backgroundImage: `url(${flagsImage})`,
               backgroundPosition: 'right center'
             }} 
        />
      </Button>
    </div>
  );
};