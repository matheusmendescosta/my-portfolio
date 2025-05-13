'use client';

import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

type FormProps = {
  postId: string;
};

export const useSendWaPost = ({ postId }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('components.pages.brain.post.use_send_post_wa');

  const handlerSubmitPost = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/${postId}/sendWaPost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone: `55${phone.replace(/\D/g, '')}`,
        }),
      });
      if (!response.ok) {
        setName('');
        setPhone('');
        toast({
          title: t('title_error'),
          description: t('subtitle_error'),
          variant: 'destructive',
        });
        setIsOpen(false);
      } else {
        toast({
          title: t('title_success'),
          description: t('subtitle_success'),
          variant: 'default',
        });
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handlerSubmitPost, name, setName, phone, setPhone, isOpen, setIsOpen };
};
