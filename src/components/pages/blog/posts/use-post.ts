'use client';

import { PostDTO } from '@/dto/PostDto';
import { useCallback, useEffect, useState } from 'react';

type UsePostProps = {
  postId: string;
};

export const usePost = ({ postId }: UsePostProps) => {
  const [post, setPost] = useState<PostDTO>();

  const loadPost = useCallback(() => {
    fetch(`http://localhost:3333/api/v1/post/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Fetch fail');
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  return { post, setPost };
};
