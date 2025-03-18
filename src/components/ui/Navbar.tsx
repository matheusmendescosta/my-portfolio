import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Tutorial from './Onboarding';
import LocaleSwitcher from './LocaleSwitcher';
import DarkMode from './DarkMode';

const navItems = [
  { path: '/', name: 'home' },
  { path: '/brain', name: 'brain' },
];

const tutorialSteps = [
  {
    title: '🌐 Alterar Idioma',
    description: 'Personalize sua experiência escolhendo o idioma de sua preferência. Clique no ícone de idioma.',
    selector: '#changeLanguage',
    position: 'absolute',
  },
];

export function Navbar() {
  const t = useTranslations('components.ui.navbar');
  return (
    <aside className="mb-16 py-2 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav className="fade relative flex flex-col items-center px-0 pb-0 md:relative md:overflow-auto" id="nav">
          <div className="flex flex-row space-x-4">
            {navItems.map((item) => {
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative m-1 flex px-2 py-1 align-middle transition-all hover:text-slate-600 dark:hover:text-slate-400"
                >
                  {t(`navItems.${item.name}`)}
                </Link>
              );
            })}

            <div id="changeLanguage">
              <LocaleSwitcher />
            </div>
            <DarkMode />
          </div>
        </nav>
      </div>
      <Tutorial steps={tutorialSteps} />
    </aside>
  );
}
