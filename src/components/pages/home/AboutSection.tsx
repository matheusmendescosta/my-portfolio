'use client';

import React from 'react';
import { useTranslations } from 'use-intl';

function AboutSection() {
  const t = useTranslations('components.pages.home.about_section');
  return (
    <section>
      <h2 className="mb-2 text-sm font-bold dark:text-gray-200">{t('title')}</h2>
      <p className="mb-9 text-justify text-sm dark:text-gray-400">{t('description')}</p>
    </section>
  );
}

export default AboutSection;
