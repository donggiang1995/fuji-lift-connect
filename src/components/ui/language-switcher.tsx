import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import flagsImage from "@/assets/flags.png";

interface LanguageSwitcherProps {
  currentLang: 'ko' | 'en';
  onLanguageChange: (lang: 'ko' | 'en') => void;
}

export const LanguageSwitcher = ({ currentLang, onLanguageChange }: LanguageSwitcherProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="glass-morphism p-2">
          <div className="w-6 h-4 bg-cover bg-center rounded-sm" 
               style={{ 
                 backgroundImage: `url(${flagsImage})`,
                 backgroundPosition: currentLang === 'ko' ? 'left center' : 'right center'
               }} 
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-morphism">
        <DropdownMenuItem 
          onClick={() => onLanguageChange('ko')}
          className={`flex items-center space-x-2 ${currentLang === 'ko' ? 'bg-primary text-primary-foreground' : ''}`}
        >
          <div className="w-5 h-3 bg-cover bg-center rounded-sm" 
               style={{ 
                 backgroundImage: `url(${flagsImage})`,
                 backgroundPosition: 'left center'
               }} 
          />
          <span>한국어</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onLanguageChange('en')}
          className={`flex items-center space-x-2 ${currentLang === 'en' ? 'bg-primary text-primary-foreground' : ''}`}
        >
          <div className="w-5 h-3 bg-cover bg-center rounded-sm" 
               style={{ 
                 backgroundImage: `url(${flagsImage})`,
                 backgroundPosition: 'right center'
               }} 
          />
          <span>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};