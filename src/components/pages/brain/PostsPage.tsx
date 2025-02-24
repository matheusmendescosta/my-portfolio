'use client';

import React from 'react';
import { usePosts } from './use-posts';
import PostSection from './PostSection';
import { useTranslations } from 'next-intl';

const PostsPage = () => {
  const t = useTranslations();
  const { posts } = usePosts();

  return (
    <>
      {posts?.posts.length ? (
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
              comments={post._count.comments}
              likes={post._count.likes}
              key={index}
              updateAt={post.updatedAt}
              tags={post.tags.map((tag) => tag.name)}
            />
          ))}
        </>
      ) : (
        <div className="mt-10 text-center text-gray-500">Infelizmente, não há posts ainda.</div>
      )}
    </>
  );
};

export default PostsPage;
