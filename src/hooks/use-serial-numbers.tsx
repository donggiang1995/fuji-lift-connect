import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SerialNumber {
  id: string;
  serial_number: string;
  product_id: string | null;
  installation_date: string | null;
  location: string | null;
  status: 'active' | 'maintenance' | 'retired';
  notes: string | null;
  created_at: string;
  updated_at: string;
  product?: {
    id: string;
    name_ko: string;
    name_en: string;
    description_ko: string;
    description_en: string;
    image_url: string;
    specifications: any;
    features_ko: string[];
    features_en: string[];
    category?: {
      name_ko: string;
      name_en: string;
    };
  };
}

export interface SerialSearchResult {
  serialNumber: SerialNumber;
  product: SerialNumber['product'];
}

export const useSerialNumbers = () => {
  const [serialNumbers, setSerialNumbers] = useState<SerialNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSerialNumbers = async () => {
    try {
      const { data, error } = await supabase
        .from('serial_numbers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSerialNumbers((data || []).map(item => ({
        ...item,
        status: item.status as 'active' | 'maintenance' | 'retired'
      })));
    } catch (error) {
      console.error('Error fetching serial numbers:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể tải danh sách serial number',
        variant: 'destructive'
      });
    }
  };

  const searchSerialNumber = async (serialNumber: string): Promise<SerialSearchResult | null> => {
    try {
      const response = await fetch(`https://okzpfjamnpusxcocjxeb.supabase.co/functions/v1/search-serial/${encodeURIComponent(serialNumber)}`, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9renBmamFtbnB1c3hjb2NqeGViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NzQ2ODIsImV4cCI6MjA3MDA1MDY4Mn0.p_H0syMqnTDzOeqx_fOGVXbgAGK2K0wzZm_m9q5LgBc`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9renBmamFtbnB1c3hjb2NqeGViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NzQ2ODIsImV4cCI6MjA3MDA1MDY4Mn0.p_H0syMqnTDzOeqx_fOGVXbgAGK2K0wzZm_m9q5LgBc'
        }
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching serial number:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể tìm kiếm serial number',
        variant: 'destructive'
      });
      return null;
    }
  };

  const addSerialNumber = async (serialNumber: Omit<SerialNumber, 'id' | 'created_at' | 'updated_at' | 'product'>) => {
    try {
      const { error } = await supabase
        .from('serial_numbers')
        .insert(serialNumber);

      if (error) throw error;
      
      await fetchSerialNumbers();
      toast({
        title: 'Thành công',
        description: 'Đã thêm serial number mới'
      });
    } catch (error: any) {
      console.error('Error adding serial number:', error);
      if (error.code === '23505') {
        toast({
          title: 'Lỗi',
          description: 'Serial number này đã tồn tại',
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Lỗi',
          description: 'Không thể thêm serial number',
          variant: 'destructive'
        });
      }
    }
  };

  const deleteSerialNumber = async (id: string) => {
    try {
      const { error } = await supabase
        .from('serial_numbers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchSerialNumbers();
      toast({
        title: 'Thành công',
        description: 'Đã xóa serial number'
      });
    } catch (error) {
      console.error('Error deleting serial number:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể xóa serial number',
        variant: 'destructive'
      });
    }
  };

  const updateSerialNumber = async (id: string, updates: Partial<SerialNumber>) => {
    try {
      const { error } = await supabase
        .from('serial_numbers')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      await fetchSerialNumbers();
      toast({
        title: 'Thành công',
        description: 'Đã cập nhật serial number'
      });
    } catch (error) {
      console.error('Error updating serial number:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể cập nhật serial number',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchSerialNumbers();
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    serialNumbers,
    loading,
    searchSerialNumber,
    addSerialNumber,
    deleteSerialNumber,
    updateSerialNumber,
    refetch: fetchSerialNumbers
  };
};