'use client';

import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { CheckIcon, LanguagesIcon } from 'lucide-react';

import React, { useTransition } from 'react';

type LocaleSwitcherSelectProps = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
};

const LocaleSwitcherSelect = ({ defaultValue, items }: LocaleSwitcherSelectProps) => {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
        <Select.Trigger
          className={clsx(
            'relative p-2 transition-colors hover:bg-slate-800 focus:outline-none',
            isPending && 'pointer-events-none opacity-60'
          )}
        >
          <Select.Icon>
            <LanguagesIcon className="h-6 w-6 text-white transition-colors group-hover:text-slate-900" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content align="end" className="min-w-[8rem] overflow-hidden rounded-md bg-white py-1 shadow-md" position="popper">
            <Select.Viewport>
              {items.map((item) => (
                <Select.Item key={item.value} className="flex cursor-pointer items-center bg-white px-3 py-2 text-base" value={item.value}>
                  <div className="mr-2 w-[1rem]">{item.value === defaultValue && <CheckIcon className="h-5 w-5 text-slate-600" />}</div>
                  <span className="text-slate-900">{item.label}</span>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className="fill-white text-white" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default LocaleSwitcherSelect;
