import React from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSwitcherProps {
  currentLang: 'ko' | 'en';
  onLanguageChange: (lang: 'ko' | 'en') => void;
}

export const LanguageSwitcher = ({ currentLang, onLanguageChange }: LanguageSwitcherProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="glass-morphism">
          <Globe className="h-4 w-4 mr-2" />
          {currentLang === 'ko' ? '한국어' : 'English'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-morphism">
        <DropdownMenuItem 
          onClick={() => onLanguageChange('ko')}
          className={currentLang === 'ko' ? 'bg-primary text-primary-foreground' : ''}
        >
          한국어
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onLanguageChange('en')}
          className={currentLang === 'en' ? 'bg-primary text-primary-foreground' : ''}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};