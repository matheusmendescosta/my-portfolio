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
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';
import useContactMe from './use-contact-me';

const ContactSection = () => {
  const { handleChange, handleSubmit, formData, status } = useContactMe();

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
      <Drawer>
        <DrawerTrigger asChild>
          <button
            className={twJoin(
              'm-0 border-0 bg-transparent p-0 transition-transform hover:scale-150 hover:text-black dark:hover:text-gray-200'
            )}
          >
            <Mail size={20} />
          </button>
        </DrawerTrigger>
        <DrawerContent className="bg-white dark:bg-black">
          <DrawerHeader>
            <DrawerTitle className="text-black dark:text-white">Enviar E-mail</DrawerTitle>
            <DrawerDescription>Preencha o formulário abaixo para entrar em contato.</DrawerDescription>
          </DrawerHeader>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="mx-4 grid gap-2">
              <label htmlFor="email">E-mail</label>
              <input
                name="email"
                onChange={handleChange}
                value={formData.email}
                type="email"
                id="email"
                className="input border p-1 text-black dark:bg-slate-200"
              />
            </div>
            <div className="mx-4 grid gap-2">
              <label htmlFor="name">Nome</label>
              <input
                name="name"
                onChange={handleChange}
                value={formData.name}
                type="name"
                id="name"
                className="input border p-1 text-black dark:bg-slate-200"
              />
            </div>
            <div className="mx-4 grid gap-2">
              <label htmlFor="message">Mensagem</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                id="message"
                className="input border p-2 text-black dark:bg-slate-200"
                rows={4}
              />
            </div>
            <DrawerFooter className="flex flex-col space-y-2">
              {status && <p className="text-center text-sm text-red-600">{status}</p>}
              <Button type="submit">Enviar</Button>
              <DrawerClose asChild>
                <Button>Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ContactSection;
