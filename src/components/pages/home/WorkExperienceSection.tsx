import { useTranslations } from 'next-intl';
import Image from 'next/image';

const experiences = [
  {
    company: 'EvoTalks',
    img: '/experiences/evotalks.jpg',
    url: 'https://www.evotalks.com.br/',
    role: 'Integration Developer',
    technologies: {
      javascript: 'javascript.png',
      api: 'apirest.png',
    },
    date: '2024 - Present',
    description: 'integrating some systems',
  },
  {
    company: 'RBR Digital',
    img: '/experiences/rbr.jpg',
    url: 'http://enterpriselevel.com/',
    role: 'Fullstack Developer',
    date: '2024 - 2024',
    description: 'helping people with an innovative healthcare system',
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
    company: 'OrçaFacio',
    img: '/experiences/orcafascio.jpg',
    url: 'https://www.orcafascio.com/',
    role: 'FullStack Developer',
    date: '2023 - 2024',
    description: 'building the world (literally)',
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
    company: 'TNP',
    url: 'https://www.tnpbrasil.com.br/',
    img: '/experiences/tnp.jpg',
    role: 'Frontend Developer',
    date: '2023 - 2023',
    description: 'Cashback system',
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
    company: 'Prosas',
    img: '/experiences/prosas.jpg',
    url: 'https://prosas.com.br/inicio',
    role: 'Frontend Developer',
    date: '2022 - 2023',
    description: 'building a better world',
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

  return (
    <>
      <h2 className="mb-4 text-sm font-bold text-gray-200">{t('title')}</h2>

      <div>
        {experiences.map((experience, index) => (
          <div key={index} className="mb-4 flex">
            <div className="mr-4 mt-6">
              <Image src={experience.img} width={50} height={50} alt="company logo" className="rounded-md" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-100">{experience.role}</h3>
              <a
                href={experience.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-400 hover:underline"
              >
                {experience.company}
                <ArrowIcon />
              </a>
              <p className="text-sm text-gray-400">{experience.date}</p>
              <p className="text-sm text-gray-500">{experience.description}</p>
              {experience.technologies && (
                <div className="mt-2 flex gap-2">
                  {Object.entries(experience.technologies).map(([tech, imgSrc]) => (
                    <Image
                      key={tech}
                      src={`/technologies/${imgSrc}`}
                      width={20}
                      height={20}
                      alt={tech}
                      title={tech}
                      className="rounded-sm"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default WorkExperienceSection;
