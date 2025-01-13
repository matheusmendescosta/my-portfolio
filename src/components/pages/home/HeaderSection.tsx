'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

function HeaderSection() {
  const t = useTranslations('components.pages.home.header_section');
  return (
    <div className="mb-9 flex">
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.4 },
        }}
      >
        <Image src="/images/profile.png" width={100} height={100} alt="image profile" className="rounded-full" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          delay: 1,
          scale: { type: 'spring', visualDuration: 0.4, bounce: 0.4 },
        }}
      >
        <div className="ml-4 mt-4 text-left">
          <p className="text-lg font-bold text-gray-200">{t('name')}</p>
          <p className="text-md font-semibold text-gray-300">{t('occupation')}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default HeaderSection;
