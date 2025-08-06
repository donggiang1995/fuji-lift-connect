import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SerialNumber {
  id: string;
  serial_number: string;
  product_name: string | null;
  model: string | null;
  manufacture_date: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
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
      setSerialNumbers(data || []);
    } catch (error) {
      console.error('Error fetching serial numbers:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể tải danh sách serial number',
        variant: 'destructive'
      });
    }
  };

  const addSerialNumber = async (serialNumber: Omit<SerialNumber, 'id' | 'created_at' | 'updated_at'>) => {
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
    addSerialNumber,
    deleteSerialNumber,
    updateSerialNumber,
    refetch: fetchSerialNumbers
  };
};