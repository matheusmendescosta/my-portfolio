import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('components.ui.locale_switcher.options');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          label: t('en'),
          img: '/images/usa.png',
        },
        {
          value: 'pt-br',
          label: t('pt-br'),
          img: '/images/br.png',
        },
      ]}
    />
  );
}
