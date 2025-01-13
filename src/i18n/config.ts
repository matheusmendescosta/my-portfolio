export type Locale = (typeof locales)[number];

export const locales = ['pt-br', 'en'] as const;
export const defaultLocale: Locale = 'en';