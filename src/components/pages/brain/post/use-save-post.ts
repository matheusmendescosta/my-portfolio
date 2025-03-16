'use client';

import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

type FormProps = {
  postId: string;
};

export const useSavePost = ({ postId }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('components.pages.brain.post.use_save_post');

  const handlerSubmitPost = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/${postId}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
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

  return { isSubmitting, handlerSubmitPost, email, setEmail, isOpen, setIsOpen };
};
