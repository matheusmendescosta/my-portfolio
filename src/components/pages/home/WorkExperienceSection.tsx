'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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
      typescript: 'typescript.png',
      github: 'octacat.png',
      react: 'reactjs.png',
      next: 'nextjs.png',
      tailwind: 'tailwindcss.png',
      postgresql: 'postgresql.png',
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
      postgresql: 'postgresql.png',
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

function WorkExperienceSection() {
  const t = useTranslations('components.pages.home.work_experience_section');
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <section className="">
      <h2 className="mb-4 text-lg font-bold dark:text-gray-200">{t('title')}</h2>
      <div>
        {experiences.map((experience, index) => (
          <div key={index} className="mb-9 flex">
            <div className="mr-4 mt-6 flex-shrink-0">
              <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 1 }}>
                <Image src={experience.img} width={50} height={50} alt="company logo" className="rounded-md" />
              </motion.div>
            </div>
            <div>
              <h3 className="text-md font-semibold dark:text-gray-100">{t(`experiences.${index}.role`)}</h3>
              <a
                href={experience.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm hover:underline dark:text-gray-400"
              >
                {t(`experiences.${index}.company`)}
                <ArrowUpRight />
              </a>
              <p className="text-sm dark:text-gray-400">{t(`experiences.${index}.date`)}</p>
              <div className="text-sm dark:text-gray-500">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <span>
                        {t('description_position')} {t(`experiences.${index}.company`)}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>{t(`experiences.${index}.description`)}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <p className="dark:text-slate-300">{t('technology_stack')}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(experience.technologies).map(([tech, imgSrc]) => (
                  <motion.div
                    key={tech}
                    onMouseEnter={() => setHoveredIcon(`${tech}_${index}`)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    initial={{ y: 0 }}
                    animate={hoveredIcon === `${tech}_${index}` ? { y: [0, -10, 0] } : { y: 0 }}
                    transition={{ duration: 0.6, repeat: hoveredIcon === `${tech}_${index}` ? Infinity : 0, repeatType: 'loop' }}
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
    </section>
  );
}

export default WorkExperienceSection;
