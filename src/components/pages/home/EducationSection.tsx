'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Education = [
  {
    school: '',
    img: '/education/logoMeta.jpg',
    url: 'https://faculdade.meta.edu.br/',
    course: '',
    date: '',
    description: '',
  },
  {
    school: '',
    img: '/education/LogoXP.jpg',
    url: 'https://www.xpeducacao.com.br/',
    course: '',
    date: '',
    description: '',
  },
];

function EducationSection() {
  const t = useTranslations('components.pages.home.education_section');

  return (
    <section>
      <h2 className="mb-4 text-lg font-bold dark:text-gray-200">{t('title')}</h2>
      <div>
        {Education.map((education, index) => (
          <div key={index} className="mb-9 flex min-w-full">
            <div className="mr-4 mt-6">
              <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 1 }}>
                <Image src={education.img} width={50} height={50} alt="company logo" className="rounded-md" />
              </motion.div>
            </div>
            <div>
              <h3 className="text-md font-semibold dark:text-gray-100">{t(`education.${index}.course`)}</h3>
              <a
                href={education.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm hover:underline dark:text-gray-400"
              >
                {t(`education.${index}.school`)}
                <ArrowUpRight />
              </a>
              <p className="text-sm dark:text-gray-400">{t(`education.${index}.date`)}</p>
              <p className="text-sm dark:text-gray-500">{t(`education.${index}.description`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EducationSection;
