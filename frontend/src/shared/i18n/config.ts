import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en as enEn } from './locales/en/translations'; // ISO 639-1 Language Code
import { ru as ruRu } from './locales/ru/translations';
import { pl as plPl } from './locales/pl/translations';
import { uz as uzUz } from './locales/uz/translations';
import { be as beBe } from './locales/be/translations';

const defaultLang = localStorage.getItem('lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLang,
    lng: defaultLang,
    resources: {
      en: {
        translations: enEn,
      },
      ru: {
        translations: ruRu,
      },
      pl: {
        translations: plPl,
      },
      uz: {
        translations: uzUz,
      },
      be: {
        translations: beBe,
      },
    },
    ns: ['translations'],
    defaultNS: 'translations',
  })
  .then();

i18n.languages = ['en', 'ru', 'pl', 'uz', 'be'];
export default i18n;
