import Link from 'next/link';
import { Languages } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
            <div className="text-bg-center absolute right-0 px-2 py-2">
              <Languages />
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
