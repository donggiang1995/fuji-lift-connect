import React, { useState } from "react";
import { Search, MapPin, Calendar, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useSerialNumbers, type SerialSearchResult } from "@/hooks/use-serial-numbers";

interface SerialSearchProps {
  placeholder?: string;
  onSearch?: (serialNumber: string) => void;
  language?: 'ko' | 'en';
}

export const SerialSearch = ({ placeholder, onSearch, language = 'en' }: SerialSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<SerialSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { searchSerialNumber } = useSerialNumbers();

  const content = {
    ko: {
      searchResult: "검색 결과",
      searching: "검색 중...",
      notFound: "검색 결과가 없습니다",
      serialNumber: "시리얼 번호",
      status: "상태",
      location: "위치",
      installationDate: "설치일",
      productName: "제품명",
      description: "설명",
      category: "카테고리",
      model: "모델",
      specifications: "사양",
      features: "특징",
      active: "원본",
      maintenance: "정비 중",
      retired: "운행 중단",
      errorMessage: "검색 중 오류가 발생했습니다"
    },
    en: {
      searchResult: "Search Result",
      searching: "Searching...",
      notFound: "No results found",
      serialNumber: "Serial Number",
      status: "Status",
      location: "Location",
      installationDate: "Installation Date",
      productName: "Product Name",
      description: "Description",
      category: "Category",
      model: "Model",
      specifications: "Specifications",
      features: "Features",
      active: "Original",
      maintenance: "Under Maintenance",
      retired: "Retired",
      errorMessage: "An error occurred during search"
    }
  };

  // Ensure we have a valid language and content
  const validLanguage = language === 'ko' ? 'ko' : 'en';
  const t = content[validLanguage];

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const searchResult = await searchSerialNumber(searchTerm);
      setResult(searchResult);
      setIsOpen(true);
    } catch (err) {
      setError(t.errorMessage);
    } finally {
      setLoading(false);
    }
    
    onSearch?.(searchTerm);
  };

  const getStatusBadge = (status: 'active' | 'maintenance' | 'retired') => {
    const statusConfig = {
      active: {
        className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        text: t.active,
        indicator: "🟢"
      },
      maintenance: {
        className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        text: t.maintenance,
        indicator: "🟡"
      },
      retired: {
        className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        text: t.retired,
        indicator: "🔴"
      }
    };
    
    const config = statusConfig[status];
    return (
      <Badge className={config.className}>
        {config.indicator} {config.text}
      </Badge>
    );
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder || "Enter serial number..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10 glass-morphism"
          />
        </div>
        <Button 
          onClick={handleSearch} 
          disabled={loading}
          className="bg-primary hover:bg-primary/90"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t.searching}
            </>
          ) : (
            "Search"
          )}
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.searchResult}</DialogTitle>
            <DialogDescription>
              {searchTerm && `${t.serialNumber}: ${searchTerm}`}
            </DialogDescription>
          </DialogHeader>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              <span>{t.searching}</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-red-500 text-2xl mb-2">❌</div>
              <p className="text-destructive font-medium">{error}</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Serial Number Information */}
              <Card className="industrial-card">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        {t.serialNumber}
                      </h3>
                      <p className="font-mono text-xl mt-1">{result.serialNumber.serial_number}</p>
                    </div>
                    {getStatusBadge(result.serialNumber.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {result.serialNumber.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{t.location}:</span>
                        <span>{result.serialNumber.location}</span>
                      </div>
                    )}
                    {result.serialNumber.installation_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{t.installationDate}:</span>
                        <span>{result.serialNumber.installation_date}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Product Information */}
              {result.product && (
                <Card className="industrial-card">
                  <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">
                              {validLanguage === 'ko' ? result.product.name_ko : result.product.name_en}
                            </h3>
                            {result.product.category && (
                              <Badge variant="secondary">
                                {validLanguage === 'ko' ? result.product.category.name_ko : result.product.category.name_en}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground mb-4">
                            {validLanguage === 'ko' ? result.product.description_ko : result.product.description_en}
                          </p>

                        {/* Specifications */}
                        {result.product.specifications && Object.keys(result.product.specifications).length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">{t.specifications}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              {Object.entries(result.product.specifications).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-muted-foreground">{key}:</span>
                                  <span>{String(value)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Features */}
                        {((validLanguage === 'ko' && result.product.features_ko?.length) || 
                          (validLanguage === 'en' && result.product.features_en?.length)) && (
                          <div>
                            <h4 className="font-medium mb-2">{t.features}</h4>
                            <ul className="text-sm space-y-1">
                              {(validLanguage === 'ko' ? result.product.features_ko : result.product.features_en)?.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <span className="w-1 h-1 bg-primary rounded-full"></span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      {/* Product Image */}
                      {result.product.image_url && (
                        <div className="ml-4 flex-shrink-0">
                          <img 
                            src={result.product.image_url} 
                            alt={validLanguage === 'ko' ? result.product.name_ko : result.product.name_en}
                            className="w-40 h-40 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 text-2xl mb-2">❌</div>
              <p className="text-muted-foreground font-medium">
                {t.notFound} "{searchTerm}"
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Please check the serial number and try again.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};