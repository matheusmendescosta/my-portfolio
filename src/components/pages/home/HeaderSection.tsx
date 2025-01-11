import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

function HeaderSection() {
  const t = useTranslations('components.pages.home.header_section');
  return (
    <div className="mb-9 flex">
      <Image src="/images/profile.png" width={100} height={100} alt="image profile" className="rounded-full" />
      <div className="ml-4 mt-4 text-left">
        <p className="text-lg font-bold text-gray-200">{t('name')}</p>
        <p className="text-md font-semibold text-gray-300">{t('occupation')}</p>
      </div>
    </div>
  );
}

export default HeaderSection;
