'use client';

import React from 'react';
import { usePosts } from './use-posts';

const PostsSection = () => {
  const { posts } = usePosts();

  return (
    <>
      {posts.map((post, index) => (
        <div key={index} className="mb-4 rounded p-4 shadow-sm">
          <p className="mb-2 text-lg font-bold">{post.title}</p>
          <p className="mb-2 text-gray-700">{post.content}</p>
          <p className="mb-2 text-sm text-gray-500">{post.createdAt}</p>
          <p className="text-sm text-gray-500">❤️ {post._count.likes}</p>
        </div>
      ))}
    </>
  );
};

export default PostsSection;
