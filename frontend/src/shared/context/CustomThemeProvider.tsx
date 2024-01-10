import React, { createContext, useMemo, useState } from 'react';
import { Props } from './AuthContext';
import { PaletteMode, ThemeProvider } from '@mui/material';
import { getModeTheme } from '../../common/themes/dispatch';
import { Theme } from '../../common/constants/state';

interface ICustomTheme {
  colorMode?: {
    toggleColorMode: () => void;
  };
  mode?: PaletteMode;
  toggleThemeStorage?: () => void;
}

export const CustomThemeContext = createContext<ICustomTheme>({});

export const CustomThemeProvider: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>((localStorage.getItem('theme') || Theme.LIGHT) as PaletteMode);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
      },
    }),
    [],
  );

  const toggleThemeStorage = () => {
    localStorage.setItem('theme', mode === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  const theme = useMemo(() => getModeTheme(mode), [mode]);

  const providerValue = {
    mode: mode,
    colorMode: colorMode,
    toggleThemeStorage: toggleThemeStorage,
  };
  return (
    <CustomThemeContext.Provider value={providerValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};
