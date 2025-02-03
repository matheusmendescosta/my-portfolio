'use client';

import React from 'react';
import { usePosts } from './use-posts';

const PostsPage = () => {
  const { posts } = usePosts();
  console.log(posts);
  return (
    <>
      {posts?.posts.map((post, index) => (
        <div key={index} className="mb-4 rounded p-4 shadow-sm">
          <a href={`blog/post/${post.id}`} className="mb-2 text-lg font-bold text-gray-600 hover:underline">
            {post.title}
          </a>
          <p className="mb-2 line-clamp-3 text-gray-700">{post.content}</p>
          <p className="mb-2 text-sm text-gray-500">{post.createdAt}</p>
          <p className="text-sm text-gray-500">❤️ {post._count.likes}</p>
        </div>
      ))}
    </>
  );
};

export default PostsPage;
