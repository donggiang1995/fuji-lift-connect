import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  Briefcase, 
  Users, 
  GraduationCap,
  Heart,
  TrendingUp,
  Shield
} from "lucide-react";
import careerTraining from "@/assets/career-training.jpg";
import aboutTeam from "@/assets/about-team.jpg";

const Careers = () => {
  const { language, setLanguage } = useLanguage();

  const content = {
    ko: {
      title: "채용정보",
      subtitle: "후지글로벌과 함께 미래를 만들어갈 인재를 찾습니다",
      applyNow: "지원하기",
      viewDetails: "상세보기",
      jobType: {
        fulltime: "정규직",
        parttime: "계약직",
        intern: "인턴"
      },
      experience: {
        junior: "신입",
        mid: "경력 3-5년",
        senior: "경력 5년 이상"
      },
      jobs: [
        {
          id: 1,
          title: "엘리베이터 시스템 엔지니어",
          department: "기술개발팀",
          location: "서울",
          type: "fulltime",
          experience: "mid",
          description: "엘리베이터 제어 시스템 설계 및 개발 업무를 담당합니다.",
          requirements: [
            "전기/전자/제어공학 전공",
            "엘리베이터 관련 경력 3년 이상",
            "PLC 프로그래밍 경험",
            "영어 읽기/쓰기 가능"
          ]
        },
        {
          id: 2,
          title: "해외영업 담당자",
          department: "영업팀",
          location: "서울",
          type: "fulltime", 
          experience: "mid",
          description: "해외 시장 개척 및 고객 관리 업무를 담당합니다.",
          requirements: [
            "영어 능통 (TOEIC 850점 이상)",
            "해외영업 경력 3년 이상",
            "출장 가능자",
            "대인관계 원활"
          ]
        },
        {
          id: 3,
          title: "품질관리 담당자",
          department: "품질관리팀",
          location: "부산",
          type: "fulltime",
          experience: "junior",
          description: "제품 품질 검사 및 품질 시스템 관리 업무를 담당합니다.",
          requirements: [
            "기계/전기공학 전공",
            "품질관리 관련 자격증 우대",
            "꼼꼼한 성격",
            "Excel, PowerPoint 활용 가능"
          ]
        },
        {
          id: 4,
          title: "AI 개발자",
          department: "R&D팀",
          location: "서울",
          type: "fulltime",
          experience: "mid",
          description: "엘리베이터 스마트 시스템 AI 알고리즘 개발을 담당합니다.",
          requirements: [
            "컴퓨터공학/AI 관련 전공",
            "Python, TensorFlow 경험",
            "머신러닝/딥러닝 프로젝트 경험",
            "논문 작성 경험 우대"
          ]
        }
      ],
      benefits: {
        title: "복리후생",
        items: [
          {
            icon: Heart,
            title: "건강관리",
            description: "종합건강검진, 의료비 지원, 헬스장 이용권"
          },
          {
            icon: GraduationCap,
            title: "교육지원",
            description: "직무교육, 어학연수, 자격증 취득 지원"
          },
          {
            icon: TrendingUp,
            title: "성과보상",
            description: "성과급, 인센티브, 주식매수선택권"
          },
          {
            icon: Shield,
            title: "안정성",
            description: "4대 보험, 퇴직연금, 장기근속 포상"
          }
        ]
      },
      culture: {
        title: "기업문화",
        description: "후지글로벌은 창의적이고 혁신적인 기업문화를 추구합니다",
        values: [
          "혁신과 도전",
          "팀워크와 소통", 
          "고객 중심",
          "지속가능한 성장"
        ]
      }
    },
    en: {
      title: "Careers",
      subtitle: "Join Fuji Global to build the future together",
      applyNow: "Apply Now",
      viewDetails: "View Details",
      jobType: {
        fulltime: "Full-time",
        parttime: "Contract",
        intern: "Intern"
      },
      experience: {
        junior: "Entry Level",
        mid: "3-5 Years",
        senior: "5+ Years"
      },
      jobs: [
        {
          id: 1,
          title: "Elevator System Engineer",
          department: "R&D Team",
          location: "Seoul",
          type: "fulltime",
          experience: "mid",
          description: "Responsible for elevator control system design and development.",
          requirements: [
            "Degree in Electrical/Electronic/Control Engineering",
            "3+ years elevator-related experience",
            "PLC programming experience",
            "English reading/writing skills"
          ]
        },
        {
          id: 2,
          title: "International Sales Representative",
          department: "Sales Team", 
          location: "Seoul",
          type: "fulltime",
          experience: "mid",
          description: "Responsible for overseas market development and customer management.",
          requirements: [
            "Fluent English (TOEIC 850+)",
            "3+ years international sales experience",
            "Willing to travel",
            "Strong interpersonal skills"
          ]
        },
        {
          id: 3,
          title: "Quality Control Specialist",
          department: "QC Team",
          location: "Busan",
          type: "fulltime",
          experience: "junior",
          description: "Responsible for product quality inspection and quality system management.",
          requirements: [
            "Degree in Mechanical/Electrical Engineering",
            "Quality management certification preferred",
            "Detail-oriented personality",
            "Excel, PowerPoint proficiency"
          ]
        },
        {
          id: 4,
          title: "AI Developer",
          department: "R&D Team",
          location: "Seoul", 
          type: "fulltime",
          experience: "mid",
          description: "Responsible for developing AI algorithms for elevator smart systems.",
          requirements: [
            "Degree in Computer Science/AI",
            "Python, TensorFlow experience",
            "Machine learning/Deep learning project experience",
            "Research paper experience preferred"
          ]
        }
      ],
      benefits: {
        title: "Benefits",
        items: [
          {
            icon: Heart,
            title: "Health Care",
            description: "Comprehensive health checkup, medical support, gym membership"
          },
          {
            icon: GraduationCap,
            title: "Education Support",
            description: "Job training, language study, certification support"
          },
          {
            icon: TrendingUp,
            title: "Performance Rewards",
            description: "Performance bonus, incentives, stock options"
          },
          {
            icon: Shield,
            title: "Stability",
            description: "Full insurance, retirement plan, long-service awards"
          }
        ]
      },
      culture: {
        title: "Company Culture",
        description: "Fuji Global pursues a creative and innovative corporate culture",
        values: [
          "Innovation & Challenge",
          "Teamwork & Communication",
          "Customer Focus", 
          "Sustainable Growth"
        ]
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${careerTraining})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/70"></div>
          </div>
          <div className="relative container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">{t.subtitle}</p>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid gap-6">
              {t.jobs.map((job) => (
                <Card key={job.id} className="industrial-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <Badge variant="secondary">{t.jobType[job.type as keyof typeof t.jobType]}</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.department}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {t.experience[job.experience as keyof typeof t.experience]}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-3">{job.description}</p>
                        <div className="space-y-1">
                          <h4 className="font-medium text-sm">Requirements:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {job.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">{t.viewDetails}</Button>
                        <Button>{t.applyNow}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.benefits.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.benefits.items.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Company Culture */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.culture.title}</h2>
                <p className="text-xl text-muted-foreground mb-8">{t.culture.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {t.culture.values.map((value, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img 
                  src={aboutTeam} 
                  alt="Team Culture" 
                  className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default Careers;