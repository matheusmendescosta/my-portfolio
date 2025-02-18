import { useTranslations } from 'next-intl';
import React from 'react';

const HeaderSection = () => {
  const t = useTranslations('components.pages.blog');
  return (
    <div className="min-w-full py-6 dark:text-white">
      <div className="container mx-auto px-10">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="mt-2 text-lg">{t('subtitle')}</p>
      </div>
    </div>
  );
};

export default HeaderSection;
