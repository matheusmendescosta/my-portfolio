import { useTranslations } from 'next-intl';
import PostSection from './posts/PostsSection';
import HeaderSection from './HeaderSection';

export const BlogPage = () => {
  const t = useTranslations('components.pages.blog');

  return (
    <>
      <HeaderSection />
      <PostSection />
    </>
  );
};
