import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LocaleSwitcher from './LocaleSwitcher';

const navItems = [
  {
    path: '/',
    name: 'home',
  },
  {
    path: '/blog',
    name: 'blog',
  },
];

export function Navbar() {
  const t = useTranslations('components.ui.navbar');
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto" id="nav">
          <div className="flex flex-row space-x-0 pr-10">
            {navItems.map((item) => {
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative m-1 flex px-2 py-1 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
                >
                  {t(`navItems.${item.name}`)}
                </Link>
              );
            })}
          </div>
          <div className="absolute right-0 float-right">
            <LocaleSwitcher />
          </div>
        </nav>
      </div>
    </aside>
  );
}
