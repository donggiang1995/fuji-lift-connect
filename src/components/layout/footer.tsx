import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import fujiLogo from "@/assets/fuji-logo-new.png";
import worldMapBg from "@/assets/world-map-bg.png";

interface FooterProps {
  language: 'ko' | 'en';
}

const content = {
  ko: {
    company: "FUJI Global Korea",
    tagline: "엘리베이터 기술의 선두주자",
    quickLinks: "빠른 링크",
    contact: "연락처",
    address: "#1901, Building 102, Paragon, 361 Gwangnaru-ro, Gwangjin-gu, Seoul",
    phone: "+82 10 6488 6706",
    email: "info@fujiglobal.kr",
    copyright: "© 2024 FUJI Global Korea. 모든 권리 보유.",
    links: [
      { name: "홈", href: "/" },
      { name: "회사소개", href: "/about" },
      { name: "제품", href: "/products" },
      { name: "문의", href: "/contact" },
    ]
  },
  en: {
    company: "FUJI Global Korea",
    tagline: "Leading Elevator Technology Solutions",
    quickLinks: "Quick Links",
    contact: "Contact Information",
    address: "#1901, Building 102, Paragon, 361 Gwangnaru-ro, Gwangjin-gu, Seoul",
    phone: "+82 10 6488 6706",
    email: "info@fujiglobal.kr",
    copyright: "© 2024 FUJI Global Korea. All rights reserved.",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Products", href: "/products" },
      { name: "Contact", href: "/contact" },
    ]
  }
};

export const Footer = ({ language }: FooterProps) => {
  const t = content[language];

  return (
    <footer className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5 bg-cover bg-center"
        style={{ backgroundImage: `url(${worldMapBg})` }}
      />
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/lovable-uploads/ec8e0728-48fb-40cf-b115-25de3b1bfb4d.png" 
                alt="FUJI Global Korea" 
                className="h-24 w-auto object-contain"
              />
              <div>
                <h3 className="text-xl font-bold">{t.company}</h3>
                <p className="text-sm text-gray-300">{t.tagline}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              {language === 'ko' 
                ? "FUJI Global Korea는 최첨단 엘리베이터 제어 시스템과 견인기 기술을 제공하는 선도적인 기업입니다."
                : "FUJI Global Korea is a leading provider of cutting-edge elevator control systems and traction machine technology."
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {t.links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t.contact}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                <p className="text-gray-300 text-sm">{t.address}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-gray-300 text-sm">{t.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-gray-300 text-sm">{t.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{t.copyright}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                {language === 'ko' ? '개인정보처리방침' : 'Privacy Policy'}
              </a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                {language === 'ko' ? '이용약관' : 'Terms of Service'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};