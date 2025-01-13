import { useLocale } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
//   const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          label: ('en')
        },
        {
          value: 'pt-br',
          label: ('pt-br')
        }
      ]}
      label={('label')}
    />
  );
}