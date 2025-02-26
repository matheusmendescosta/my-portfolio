import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Turnstile } from '@marsidev/react-turnstile';
import { Brain, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';
import useContactMe from './use-contact-me';

const ContactSection = () => {
  const { handleChange, handleSubmit, formData, status, isOpen, setIsOpen, setCaptchaToken } = useContactMe();
  const t = useTranslations('components.pages.home.contact_section');

  return (
    <div className="flex items-center space-x-2">
      <Link
        href="https://github.com/matheusmendescosta"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-150 hover:text-black dark:hover:text-gray-200"
      >
        <Github size={20} />
      </Link>
      <Link
        href="https://www.linkedin.com/in/matheusmendescosta/"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-150 hover:text-black dark:hover:text-gray-200"
      >
        <Linkedin size={20} />
      </Link>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <button
            onClick={() => setIsOpen(true)}
            className={twJoin(
              'm-0 border-0 bg-transparent p-0 transition-transform hover:scale-150 hover:text-black dark:hover:text-gray-200'
            )}
          >
            <Mail size={20} />
          </button>
        </DrawerTrigger>
        <DrawerContent className="mx-auto flex max-w-md flex-col bg-white dark:bg-black">
          <DrawerHeader>
            <DrawerTitle className="text-black dark:text-white">{t('send_email')}</DrawerTitle>
            <DrawerDescription>{t('description_email')}</DrawerDescription>
          </DrawerHeader>
          <form className="mx-4 grid gap-2" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="email">{t('email')}</label>
              <input
                name="email"
                required
                onChange={handleChange}
                value={formData.email}
                type="email"
                id="email"
                className="input border p-1 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="name">{t('name')}</label>
              <input
                name="name"
                required
                onChange={handleChange}
                value={formData.name}
                type="name"
                id="name"
                className="input border p-1 text-black dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="message">{t('message')}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                id="message"
                className="input border p-2 text-black dark:bg-slate-900 dark:text-white"
                rows={3}
              />
            </div>
            <div className='grid gap-1 justify-center pt-4'>
              <Turnstile siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!} onSuccess={setCaptchaToken} />
            </div>
            <DrawerFooter className="flex flex-col">
              <p className="text-md text-center font-semibold opacity-100 transition-opacity duration-500 ease-in-out">{status}</p>
              <Button variant="secondary" type="submit">
                {t('submit')}
              </Button>
              <DrawerClose asChild>
                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                  {t('cancel')}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
      <Link
        href="https://brain.matheusmendes.fun"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-150 hover:text-black dark:hover:text-gray-200"
      >
        <Brain size={20} />
      </Link>
    </div>
  );
};

export default ContactSection;
