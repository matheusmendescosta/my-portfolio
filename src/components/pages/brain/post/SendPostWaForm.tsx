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
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { twJoin } from 'tailwind-merge';
import { useSendWaPost } from './use-send-post-wa';
type SavePostFormProps = {
  postId: string;
};
const SendPostWaForm = ({ postId }: SavePostFormProps) => {
  const { isOpen, setIsOpen, handlerSubmitPost, isSubmitting, name, setName, phone, setPhone } = useSendWaPost({ postId });
  const t = useTranslations('components.pages.brain.post.send_post_wa_form');
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className={twJoin(
            'm-0 border-0 bg-transparent p-0 transition-transform hover:scale-150 hover:text-black dark:hover:text-gray-200'
          )}
        >
          <MessageCircle size={20} />
        </button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto flex max-w-md flex-col bg-white dark:bg-black">
        <DrawerHeader>
          <DrawerTitle className="text-black dark:text-white">{t('title')}</DrawerTitle>
          <DrawerDescription>{t('subtitle')}</DrawerDescription>
        </DrawerHeader>
        <form className="mx-4 grid gap-2" onSubmit={handlerSubmitPost}>
          <div className="grid gap-1">
            <label htmlFor="name">{t('name')}</label>
            <input
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="name"
              id="name"
              className="input border p-1 dark:bg-slate-900 dark:text-white"
            />
            <label htmlFor="phone">{t('phone')}</label>
            <input
              name="phone"
              required
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="phone"
              id="phone"
              className="input border p-1 dark:bg-slate-900 dark:text-white"
            />
          </div>
          <DrawerFooter className="flex flex-col">
            <Button variant="secondary" type="submit" disabled={isSubmitting} className="relative">
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                </div>
              )}
              <span className={isSubmitting ? 'opacity-0' : ''}>{t('submit')}</span>
            </Button>
            <DrawerClose asChild>
              <Button variant="secondary" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
                {t('cancel')}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default SendPostWaForm;
