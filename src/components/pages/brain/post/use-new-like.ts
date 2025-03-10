'use client';

import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

type FormProps = {
  postId: string;
};

export const useNewLike = ({ postId }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('components.pages.brain.post.use_new_like');

  const handlerSubmitLike = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/like/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        toast({
          title: t('title_error_like'),
          description: t('description_error_like'),
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('title_like'),
          description: t('description_like'),
          variant: 'default',
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handlerSubmitLike };
};
