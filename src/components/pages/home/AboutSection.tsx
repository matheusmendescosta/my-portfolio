'use client';

import React from 'react';
import { useTranslations } from 'use-intl';

function AboutSection() {
  const t = useTranslations('components.pages.home.about_section');
  return (
    <section>
      <h2 className="text-sm mb-2 text-gray-200 font-bold">{t('title')}</h2>
      <p className="mb-9 text-gray-400 text-justify text-sm">{t('description')}</p>
    </section>
  );
}

export default AboutSection;
