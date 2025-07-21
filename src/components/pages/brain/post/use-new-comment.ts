'use client';

import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

type FormProps = {
  content: string;
  postId: string;
  parentCommentId?: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
};

export const useNewComment = ({ postId, content, parentCommentId, setContent, refetch }: FormProps) => {
  const [isAITyping, setIsAITyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('components.pages.brain.post.use_new_comment');

  const handlerSubmitComment = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/comment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, ...(parentCommentId ? { parentCommentId } : {}) }),
      });
      if (!response.ok) {
        toast({
          title: t('title_commentary_error'),
          description: t('description_commentary_error'),
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('title_commentary'),
          description: t('description_commentary'),
          variant: 'default',
        });
        setContent('');

        refetch();

        setIsAITyping(true);

        setTimeout(async () => {
          await refetch();

          setIsAITyping(false);
        }, 10000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handlerSubmitComment, isAITyping };
};
