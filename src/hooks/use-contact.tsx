import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  created_at?: string;
}

export const useContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitContactForm = async (formData: ContactInquiry) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          message: formData.message
        }]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Your inquiry has been sent successfully!'
      });

      return { success: true };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: 'Error',
        description: 'Failed to send your inquiry. Please try again.',
        variant: 'destructive'
      });
      
      return { success: false, error };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitContactForm,
    isSubmitting
  };
};