'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

const experiences = [
  {
    company: '',
    img: '/experiences/evotalks.jpg',
    url: 'https://www.evotalks.com.br/',
    role: '',
    technologies: {
      javascript: 'javascript.png',
      api: 'apirest.png',
    },
    date: '',
    description: '',
  },
  {
    company: '',
    img: '/experiences/rbr.jpg',
    url: 'http://enterpriselevel.com/',
    role: '',
    date: '',
    description: '',
    technologies: {
      typescript: 'typescript.png',
      express: 'express.png',
      mongo: 'mongo.png',
      kafka: 'kafka.png',
      github: 'octacat.png',
      react: 'reactjs.png',
      next: 'nextjs.png',
      chackra: 'chackra.png',
    },
  },
  {
    company: '',
    img: '/experiences/orcafascio.jpg',
    url: 'https://www.orcafascio.com/',
    role: '',
    date: '',
    description: '',
    technologies: {
      ruby: 'ruby.png',
      typescript: 'typescript.png',
      mongo: 'mongo.png',
      docker: 'docker.png',
      rabbitmq: 'rabbitmq.jpg',
      github: 'octacat.png',
      react: 'reactjs.png',
      next: 'nextjs.png',
      tailwind: 'tailwindcss.png',
    },
  },
  {
    company: '',
    url: 'https://www.tnpbrasil.com.br/',
    img: '/experiences/tnp.jpg',
    role: '',
    date: '',
    description: '',
    technologies: {
      javascript: 'javascript.png',
      github: 'octacat.png',
      react: 'reactjs.png',
      next: 'nextjs.png',
      redux: 'redux.png',
      materialUi: 'materialui.jpg',
    },
  },
  {
    company: '',
    img: '/experiences/prosas.jpg',
    url: 'https://prosas.com.br/inicio',
    role: '',
    date: '',
    description: '',
    technologies: {
      ruby: 'ruby.png',
      javascript: 'javascript.png',
      mysql: 'mysql.png',
      github: 'octacat.png',
      react: 'reactjs.png',
      next: 'nextjs.png',
      redux: 'redux.png',
      tailwind: 'tailwindcss.png',
    },
  },
];

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

function WorkExperienceSection() {
  const t = useTranslations('components.pages.home.work_experience_section');
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <>
      <h2 className="mb-4 text-lg font-bold text-gray-200">{t('title')}</h2>
      <div>
        {experiences.map((experience, index) => (
          <div key={index} className="mb-9 flex">
            <div className="mr-4 mt-6">
              <Image src={experience.img} width={50} height={50} alt="company logo" className="rounded-md" />
            </div>
            <div>
              <h3 className="text-md font-semibold text-gray-100">{t(`experiences.${index}.role`)}</h3>
              <a
                href={experience.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-400 hover:underline"
              >
                {t(`experiences.${index}.company`)}
                <ArrowIcon />
              </a>
              <p className="text-sm text-gray-400">{t(`experiences.${index}.date`)}</p>
              <p className="text-sm text-gray-500">{t(`experiences.${index}.description`)}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(experience.technologies).map(([tech, imgSrc]) => (
                  <motion.div
                    key={tech}
                    onMouseEnter={() => setHoveredIcon(`${tech}_${index}`)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    initial={{ y: 0 }}
                    animate={hoveredIcon === `${tech}_${index}` ? { y: [0, -10, 0] } : { y: 0 }}
                    transition={{
                      duration: 0.6,
                      repeat: hoveredIcon === `${tech}_${index}` ? Infinity : 0,
                      repeatType: 'loop',
                    }}
                  >
                    <Image
                      src={`/technologies/${imgSrc}`}
                      width={22}
                      height={22}
                      alt={tech}
                      title={tech}
                      className="transform rounded-sm transition-transform duration-200 ease-in-out hover:scale-150"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default WorkExperienceSection;
