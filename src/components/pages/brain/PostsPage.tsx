'use client';

import React from 'react';
import { usePosts } from './use-posts';
import PostSection from './PostSection';

const PostsPage = () => {
  const { posts } = usePosts();

  return (
    <>
      {posts?.posts.map((post, index) => (
        <PostSection
          id={post.id}
          author={post.author.name}
          category={post.category.name}
          title={post.title}
          slug={post.slug}
          content={post.content}
          createdAt={post.createdAt}
          comments={post.comments.length}
          likes={post._count.likes}
          key={index}
          tags={post.tags.map((tag) => tag.name)}
        />
      ))}
    </>
  );
};

export default PostsPage;
