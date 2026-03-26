import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next, useTranslation } from 'react-i18next';

export const LANGUAGES = ['ko', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];

export function useLanguage(): Language {
  const { i18n: i18nInstance } = useTranslation();
  return i18nInstance.language as Language;
}

const browserLng = navigator.language.split('-')[0];
const initialLng: Language = (LANGUAGES as readonly string[]).includes(browserLng)
  ? (browserLng as Language)
  : 'ko';

await i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: initialLng,
    fallbackLng: 'ko',
    defaultNS: '_',
    nsSeparator: ':',
    keySeparator: '.',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
