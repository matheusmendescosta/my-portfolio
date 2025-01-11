import { useTranslations } from 'next-intl';
import Image from 'next/image';

const projects = [
  {
    title: 'Sistema de Indicação Madre',
    description: 'Sistema de indicação da faculdade madre tereza',
    status: '2023 - Pausado',
    demo: '#',
    img: '/projects/sim.png',
    source: 'https://github.com/codecodedev/sim-api',
    technologies: {
      typescript: 'typescript.png',
      express: 'express.png',
      mysql: 'mysql.png',
      github: 'octacat.png',
      react: 'reactjs.png',
      next: 'nextjs.png',
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

function ProjectsSection() {
  const t = useTranslations('components.pages.home.projects_section');
  return (
    <>
      <h2 className="mb-4 text-lg font-bold text-gray-200">{t('title')}</h2>
      <>
        {projects.map((project, index) => (
          <div key={index} className="mb-9 flex">
            <div className="mr-4">
              <Image src={project.img} width={100} height={100} alt="company logo" className="rounded-md" />
            </div>
            <div>
              <div>
                <h3 className="text-md font-semibold text-gray-100">{project.title}</h3>
              </div>
              <div className="flex gap-4">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-gray-400 hover:underline"
                >
                  see demo
                  <ArrowIcon />
                </a>
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-gray-400 hover:underline"
                >
                  see code
                  <ArrowIcon />
                </a>
              </div>
              <p className="text-sm text-gray-400">{project.status}</p>
              <p className="text-sm text-gray-500">{project.description}</p>
              <div className="mt-2 flex gap-2">
                {Object.entries(project.technologies).map(([tech, imgSrc]) => (
                  <Image
                    key={tech}
                    src={`/technologies/${imgSrc}`}
                    width={22}
                    height={22}
                    alt={tech}
                    title={tech}
                    className="transform rounded-sm transition-transform duration-200 ease-in-out hover:scale-150"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </>
    </>
  );
}

export default ProjectsSection;
