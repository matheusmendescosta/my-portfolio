'use client';

import { PostDTO } from '@/dto/PostDto';
import { useCallback, useEffect, useState } from 'react';

export const usePosts = () => {
  const [posts, setPosts] = useState<PostDTO[]>([]);

  const loadPosts = useCallback(() => {
    fetch('http://localhost:3333/api/v1/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Fetch fail');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return { posts, setPosts };
};
