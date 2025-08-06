import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Product, Category } from "@/hooks/use-products";

interface ProductSearchProps {
  products: Product[];
  categories: Category[];
  onProductsFilter: (filteredProducts: Product[]) => void;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  products,
  categories,
  onProductsFilter
}) => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const content = {
    ko: {
      searchPlaceholder: "제품 검색...",
      filterBy: "필터",
      category: "카테고리",
      allCategories: "모든 카테고리",
      priceRange: "가격대",
      allPrices: "모든 가격",
      under50k: "5만원 미만",
      from50to100k: "5만원 - 10만원",
      over100k: "10만원 이상",
      clearFilters: "필터 초기화",
      resultsFound: "개 제품 발견"
    },
    en: {
      searchPlaceholder: "Search products...",
      filterBy: "Filter",
      category: "Category",
      allCategories: "All Categories",
      priceRange: "Price Range",
      allPrices: "All Prices", 
      under50k: "Under $500",
      from50to100k: "$500 - $1,000",
      over100k: "Over $1,000",
      clearFilters: "Clear Filters",
      resultsFound: "products found"
    }
  };

  const t = content[language];

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => {
        const name = language === 'ko' ? product.name_ko : product.name_en;
        const description = language === 'ko' ? product.description_ko : product.description_en;
        const features = language === 'ko' ? product.features_ko : product.features_en;
        
        const searchLower = searchTerm.toLowerCase();
        return (
          name.toLowerCase().includes(searchLower) ||
          description?.toLowerCase().includes(searchLower) ||
          features?.some(feature => feature.toLowerCase().includes(searchLower))
        );
      });
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category_id === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== "all" && priceRange) {
      filtered = filtered.filter(product => {
        if (!product.price) return false;
        
        switch (priceRange) {
          case "under50k":
            return product.price < 50000;
          case "from50to100k":
            return product.price >= 50000 && product.price <= 100000;
          case "over100k":
            return product.price > 100000;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, language]);

  React.useEffect(() => {
    onProductsFilter(filteredProducts);
  }, [filteredProducts, onProductsFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange("all");
  };

  const hasActiveFilters = searchTerm || selectedCategory !== "all" || priceRange !== "all";

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          {t.filterBy}
        </Button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">{t.category}</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.allCategories}</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {language === 'ko' ? category.name_ko : category.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">{t.priceRange}</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.allPrices}</SelectItem>
                    <SelectItem value="under50k">{t.under50k}</SelectItem>
                    <SelectItem value="from50to100k">{t.from50to100k}</SelectItem>
                    <SelectItem value="over100k">{t.over100k}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    <X className="h-4 w-4 mr-2" />
                    {t.clearFilters}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {searchTerm}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm("")} />
            </Badge>
          )}
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {categories.find(c => c.id === selectedCategory)?.[language === 'ko' ? 'name_ko' : 'name_en']}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
            </Badge>
          )}
          {priceRange !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {t[priceRange as keyof typeof t] || priceRange}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange("all")} />
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {filteredProducts.length} {t.resultsFound}
      </div>
    </div>
  );
};