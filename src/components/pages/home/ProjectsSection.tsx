import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

function ArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ProjectsSection() {
  const t = useTranslations('components.pages.home.projects_section');
  return (
    <div>
      <h2 className="mb-4 text-sm font-bold text-gray-200">{t('title')}</h2>
      <div>
        <div className="mb-9 flex justify-between">
          <div className="ml-4 mt-6">
            <Image src="/images/profile.png" width={100} height={100} alt="company logo" className="rounded-md" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-100">cargo</h3>
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-400 hover:underline">
              link
              <ArrowIcon />
            </a>
            <p className="text-sm text-gray-400">data</p>
            <p className="text-sm text-gray-500">descrição</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsSection;
