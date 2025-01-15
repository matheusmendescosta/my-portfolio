import { useTranslations } from 'next-intl';
import PostsPage from './posts/PostsPage';
import HeaderSection from './HeaderSection';

export const BlogPage = () => {
  const t = useTranslations('components.pages.blog');

  return (
    <>
      <HeaderSection />
      <PostsPage />
    </>
  );
};
