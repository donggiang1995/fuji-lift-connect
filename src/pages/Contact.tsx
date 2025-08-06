import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    ko: {
      title: "문의",
      subtitle: "언제든지 연락 주세요. 최고의 서비스로 응답하겠습니다.",
      form: {
        title: "문의하기",
        name: "이름",
        namePlaceholder: "홍길동",
        email: "이메일", 
        emailPlaceholder: "hong@example.com",
        company: "회사명",
        companyPlaceholder: "회사명 (선택사항)",
        message: "메시지",
        messagePlaceholder: "문의 내용을 상세히 작성해주세요...",
        submit: "문의 보내기",
        submitting: "전송 중..."
      },
      contact: {
        title: "연락처 정보",
        address: "주소",
        addressValue: "서울특별시 강남구 테헤란로 123",
        phone: "전화번호",
        phoneValue: "+82-2-1234-5678",
        email: "이메일",
        emailValue: "info@fujiglobal.kr",
        hours: "운영시간",
        hoursValue: "월-금 09:00-18:00"
      },
      success: "문의가 성공적으로 전송되었습니다!",
      error: "문의 전송 중 오류가 발생했습니다.",
      required: "필수 항목을 모두 입력해주세요."
    },
    en: {
      title: "Contact",
      subtitle: "Get in touch with us anytime. We'll respond with our best service.",
      form: {
        title: "Send Inquiry",
        name: "Name",
        namePlaceholder: "John Doe",
        email: "Email",
        emailPlaceholder: "john@example.com", 
        company: "Company",
        companyPlaceholder: "Company Name (Optional)",
        message: "Message",
        messagePlaceholder: "Please describe your inquiry in detail...",
        submit: "Send Inquiry",
        submitting: "Sending..."
      },
      contact: {
        title: "Contact Information",
        address: "Address",
        addressValue: "123 Teheran-ro, Gangnam-gu, Seoul, South Korea",
        phone: "Phone",
        phoneValue: "+82-2-1234-5678",
        email: "Email",
        emailValue: "info@fujiglobal.kr",
        hours: "Business Hours",
        hoursValue: "Mon-Fri 09:00-18:00"
      },
      success: "Your inquiry has been sent successfully!",
      error: "An error occurred while sending your inquiry.",
      required: "Please fill in all required fields."
    }
  };

  const t = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: t.required,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: t.success
      });
      
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      toast({
        title: "Error", 
        description: t.error,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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

        {/* Contact Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="industrial-card">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Send className="h-6 w-6 mr-3 text-primary" />
                    {t.form.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">{t.form.name} *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.form.namePlaceholder}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">{t.form.email} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.form.emailPlaceholder}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company">{t.form.company}</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={t.form.companyPlaceholder}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">{t.form.message} *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t.form.messagePlaceholder}
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? t.form.submitting : t.form.submit}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="industrial-card">
                  <CardHeader>
                    <CardTitle className="text-2xl">{t.contact.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{t.contact.address}</h4>
                        <p className="text-muted-foreground">{t.contact.addressValue}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{t.contact.phone}</h4>
                        <p className="text-muted-foreground">{t.contact.phoneValue}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{t.contact.email}</h4>
                        <p className="text-muted-foreground">{t.contact.emailValue}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{t.contact.hours}</h4>
                        <p className="text-muted-foreground">{t.contact.hoursValue}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card className="industrial-card">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted flex items-center justify-center rounded-lg">
                      <MapPin className="h-16 w-16 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default Contact;