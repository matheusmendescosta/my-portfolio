'use client';

import { useTranslations } from 'next-intl';
import PostSection from './PostSection';
import { usePosts } from './use-posts';

const PostsPage = () => {
  const t = useTranslations('components.pages.brain.posts_page');
  const { posts } = usePosts();

  if (!posts) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

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
        <div className="mt-10 text-center text-gray-500">{t('no_posts')}</div>
      )}
    </>
  );
};

export default PostsPage;
