'use client';

import React, { useState } from 'react';

type FormProps = {
  content: string;
  postId: string;
  parentCommentId?: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

export const useNewComment = ({ postId, content, parentCommentId, setContent }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        throw new Error('Erro ao adicionar comentário');
      }
      setContent('');
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handlerSubmitComment };
};
