'use client';

import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import { useState, useEffect, useMemo } from 'react';

const useContactMe = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('components.pages.home.use_contact_me');

  const statusKeys = useMemo(() => ['status_wait', 'status_working', 'status_almost_done'] as const, []);

  useEffect(() => {
    if (!status) return;

    let messageIndex = 0;
    const intervalId = setInterval(() => {
      messageIndex = (messageIndex + 1) % statusKeys.length;
      setStatus(t(statusKeys[messageIndex]));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [status, t, statusKeys]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(t(statusKeys[0]));

    try {
      const response = await fetch('/api/contact/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        setStatus('');
        toast({
          title: t('toast_successes_title'),
          description: t('toast_successes_description'),
          variant: 'default',
        });
        setIsOpen(false);
      } else {
        toast({
          title: t('toast_error_title'),
          description: t('toast_error_description'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      setStatus('');
    }
  };

  return {
    handleSubmit,
    handleChange,
    formData,
    status,
    isOpen,
    setIsOpen,
  };
};

export default useContactMe;
