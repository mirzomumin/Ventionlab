import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { LangContext } from '../shared/context/LangContext';
import { FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

export const LangSelect = () => {
  const { t } = useTranslation();
  const { lang, changeLang } = useContext(LangContext);
  const languagesSelect = [
    { value: 'en', displayMsg: 'English' },
    { value: 'ru', displayMsg: 'Русский' },
    { value: 'pl', displayMsg: 'Polska' },
    { value: 'uz', displayMsg: "O'zbekcha" },
    { value: 'be', displayMsg: 'Беларускі' },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    changeLang(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel>{t('common.lang')}</InputLabel>
      <Select value={lang} label={t('common.lang')} onChange={handleChange}>
        {languagesSelect.map((lang) => {
          return (
            <MenuItem key={lang.value} value={lang.value}>
              {lang.displayMsg}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
