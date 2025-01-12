import { useTranslations } from 'next-intl';

export const BlogPage = () => {
  const t = useTranslations('components.pages.blog');

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">{t('title')}</h1>
        <p className="mt-4 text-lg text-gray-600">{t('subtitle')}</p>
      </div>
    </div>
  );
};
