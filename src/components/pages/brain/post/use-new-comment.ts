'use client';

import { useToast } from '@/hooks/use-toast';
import React, { useState } from 'react';

type FormProps = {
  content: string;
  postId: string;
  parentCommentId?: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
};

export const useNewComment = ({ postId, content, parentCommentId, setContent, refetch }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
          title: 'To many requests',
          description: 'Please wait a few seconds before trying again',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Comment added',
          description: 'Your comment has been added successfully',
          variant: 'default',
        });
        setContent('');
        refetch();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handlerSubmitComment };
};
