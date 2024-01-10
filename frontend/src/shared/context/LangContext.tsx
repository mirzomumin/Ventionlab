import React, { createContext, useState } from 'react';
import { Props } from './AuthContext';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../../common/hooks/useLocalStorage';

type LangContextType = {
  lang: string;
  changeLang: (lang: string) => void;
};

export const LangContext = createContext<LangContextType>({
  lang: 'en',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeLang: () => {},
});

export const LangProvider: React.FC<Props> = ({ children }) => {
  const { getItem, setItem } = useLocalStorage();
  const { i18n } = useTranslation();

  const getDefaultTheme = (): string => {
    return getItem('lang') || 'en';
  };

  const changeLang = (lang: string) => {
    setLang(lang);
    setItem('lang', lang);
    i18n.changeLanguage(lang);
  };

  const [lang, setLang] = useState<string>(() => getDefaultTheme());

  const contextData = {
    lang,
    changeLang,
  };

  return <LangContext.Provider value={contextData}>{children} </LangContext.Provider>;
};
