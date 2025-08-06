import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  MessageSquare, 
  Eye, 
  Trash2, 
  Plus,
  Settings
} from "lucide-react";

const Admin = () => {
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();
  
  const [products, setProducts] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const content = {
    ko: {
      title: "관리자 패널",
      subtitle: "웹사이트 콘텐츠 및 데이터 관리",
      tabs: {
        products: "제품 관리",
        inquiries: "문의 관리",
        categories: "카테고리 관리"
      },
      products: {
        title: "제품 목록",
        add: "제품 추가",
        name: "제품명",
        category: "카테고리",
        status: "상태",
        actions: "작업",
        active: "활성",
        inactive: "비활성"
      },
      inquiries: {
        title: "고객 문의",
        name: "이름",
        email: "이메일",
        company: "회사",
        message: "메시지",
        date: "날짜",
        actions: "작업"
      },
      categories: {
        title: "카테고리 목록",
        add: "카테고리 추가",
        name: "이름",
        description: "설명",
        icon: "아이콘",
        status: "상태"
      },
      actions: {
        view: "보기",
        edit: "편집",
        delete: "삭제"
      }
    },
    en: {
      title: "Admin Panel",
      subtitle: "Manage website content and data",
      tabs: {
        products: "Product Management",
        inquiries: "Inquiry Management", 
        categories: "Category Management"
      },
      products: {
        title: "Product List",
        add: "Add Product",
        name: "Product Name",
        category: "Category",
        status: "Status",
        actions: "Actions",
        active: "Active",
        inactive: "Inactive"
      },
      inquiries: {
        title: "Customer Inquiries",
        name: "Name",
        email: "Email", 
        company: "Company",
        message: "Message",
        date: "Date",
        actions: "Actions"
      },
      categories: {
        title: "Category List",
        add: "Add Category",
        name: "Name",
        description: "Description",
        icon: "Icon",
        status: "Status"
      },
      actions: {
        view: "View",
        edit: "Edit",
        delete: "Delete"
      }
    }
  };

  const t = content[language];

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch products with categories
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(name_ko, name_en)
        `)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;
      setProducts(productsData || []);

      // Fetch inquiries
      const { data: inquiriesData, error: inquiriesError } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (inquiriesError) throw inquiriesError;
      setInquiries(inquiriesData || []);

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name_ko');

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch admin data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
      toast({
        title: "Success",
        description: "Inquiry deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast({
        title: "Error", 
        description: "Failed to delete inquiry",
        variant: "destructive"
      });
    }
  };

  const toggleProductStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.map(product => 
        product.id === id 
          ? { ...product, is_active: !currentStatus }
          : product
      ));

      toast({
        title: "Success",
        description: "Product status updated successfully"
      });
    } catch (error) {
      console.error('Error updating product status:', error);
      toast({
        title: "Error",
        description: "Failed to update product status",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={setLanguage} />
        <main className="pt-16 md:pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">Loading...</div>
          </div>
        </main>
        <Footer language={language} />
      </div>
    );
  }

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

        {/* Admin Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="products" className="text-lg py-3">
                  <Package className="h-5 w-5 mr-2" />
                  {t.tabs.products}
                </TabsTrigger>
                <TabsTrigger value="inquiries" className="text-lg py-3">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  {t.tabs.inquiries}
                </TabsTrigger>
                <TabsTrigger value="categories" className="text-lg py-3">
                  <Settings className="h-5 w-5 mr-2" />
                  {t.tabs.categories}
                </TabsTrigger>
              </TabsList>

              {/* Products Tab */}
              <TabsContent value="products">
                <Card className="industrial-card">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl">{t.products.title}</CardTitle>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      {t.products.add}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">{t.products.name}</th>
                            <th className="text-left py-2">{t.products.category}</th>
                            <th className="text-left py-2">{t.products.status}</th>
                            <th className="text-left py-2">{t.products.actions}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product.id} className="border-b">
                              <td className="py-3">
                                {language === 'ko' ? product.name_ko : product.name_en}
                              </td>
                              <td className="py-3">
                                {product.category ? 
                                  (language === 'ko' ? product.category.name_ko : product.category.name_en)
                                  : 'N/A'
                                }
                              </td>
                              <td className="py-3">
                                <Badge variant={product.is_active ? "default" : "secondary"}>
                                  {product.is_active ? t.products.active : t.products.inactive}
                                </Badge>
                              </td>
                              <td className="py-3">
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => toggleProductStatus(product.id, product.is_active)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Inquiries Tab */}
              <TabsContent value="inquiries">
                <Card className="industrial-card">
                  <CardHeader>
                    <CardTitle className="text-2xl">{t.inquiries.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inquiries.map((inquiry) => (
                        <Card key={inquiry.id} className="border">
                          <CardContent className="p-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <p><strong>{t.inquiries.name}:</strong> {inquiry.name}</p>
                                <p><strong>{t.inquiries.email}:</strong> {inquiry.email}</p>
                                {inquiry.company && (
                                  <p><strong>{t.inquiries.company}:</strong> {inquiry.company}</p>
                                )}
                                <p><strong>{t.inquiries.date}:</strong> {new Date(inquiry.created_at).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p><strong>{t.inquiries.message}:</strong></p>
                                <p className="text-muted-foreground mt-1">{inquiry.message}</p>
                                <div className="flex justify-end mt-4">
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteInquiry(inquiry.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    {t.actions.delete}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Categories Tab */}
              <TabsContent value="categories">
                <Card className="industrial-card">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl">{t.categories.title}</CardTitle>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      {t.categories.add}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">{t.categories.name}</th>
                            <th className="text-left py-2">{t.categories.description}</th>
                            <th className="text-left py-2">{t.categories.icon}</th>
                            <th className="text-left py-2">{t.categories.status}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((category) => (
                            <tr key={category.id} className="border-b">
                              <td className="py-3">
                                {language === 'ko' ? category.name_ko : category.name_en}
                              </td>
                              <td className="py-3">
                                {language === 'ko' ? category.description_ko : category.description_en}
                              </td>
                              <td className="py-3">{category.icon}</td>
                              <td className="py-3">
                                <Badge variant={category.is_active ? "default" : "secondary"}>
                                  {category.is_active ? t.products.active : t.products.inactive}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default Admin;