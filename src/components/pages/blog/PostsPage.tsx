'use client';

import React from 'react';
import { usePosts } from './use-posts';

const PostsPage = () => {
  const { posts } = usePosts();

  return (
    <>
      {posts?.posts.map((post, index) => (
        <div key={index} className="mb-4 rounded p-4 shadow-sm">
          <a href={`blog/post/${post.id}`} className="mb-2 text-lg font-bold hover:underline dark:text-gray-200">
            {post.title}
          </a>
          <div className="my-4 line-clamp-3 dark:text-gray-300">
            {post.content.trim() != '' && <div className="mb-4 rounded-sm" dangerouslySetInnerHTML={{ __html: post.content }} />}
          </div>
          <p className="mb-2 text-sm dark:text-gray-500">{post.createdAt}</p>
          <p className="text-sm dark:text-gray-500">❤️ {post._count.likes}</p>
        </div>
      ))}
    </>
  );
};

export default PostsPage;
