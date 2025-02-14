'use client';

import { postsDto } from '@/dto/PostDto';
import { useCallback, useEffect, useState } from 'react';

export const usePosts = () => {
  const [posts, setPosts] = useState<postsDto>();

  const loadPosts = useCallback(() => {
    fetch('http://localhost:3333/api/v1/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Fetch fail');
        }
        return response.json();
      })
      .then((data: postsDto) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log("error usePosts",error);
      });
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return { posts, setPosts };
};
