import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: string;
  name_ko: string;
  name_en: string;
  description_ko: string;
  description_en: string;
  image_url: string;
  category_id: string;
  specifications: any;
  features_ko: string[];
  features_en: string[];
  price: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: {
    id: string;
    name_ko: string;
    name_en: string;
  };
}

export interface Category {
  id: string;
  name_ko: string;
  name_en: string;
  description_ko: string;
  description_en: string;
  icon: string;
  is_active: boolean;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(id, name_ko, name_en)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch products',
        variant: 'destructive'
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name_ko');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch categories',
        variant: 'destructive'
      });
    }
  };

  const getProductsByCategory = (categoryId: string) => {
    return products.filter(product => product.category_id === categoryId);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    products,
    categories,
    loading,
    getProductsByCategory,
    refetch: () => Promise.all([fetchProducts(), fetchCategories()])
  };
};