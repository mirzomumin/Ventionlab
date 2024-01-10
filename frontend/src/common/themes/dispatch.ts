import { createTheme, PaletteMode } from '@mui/material';
import { deepOrange, grey } from '@mui/material/colors';

export const getModeTheme = (mode: PaletteMode) => {
  const themeToken = {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: {
              main: '#e1e1e1',
            },
            text: {
              primary: grey[900],
            },
            background: {
              hover: 'rgba(220,216,216,0.3)',
            },
            slider: {
              bg: 'rgba(44,42,42,0.3)',
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: '#20232f',
            },
            divider: deepOrange[700],
            background: {
              default: '#454a62',
              paper: '#20232f',
              prima: '#20232f',
              hover: 'rgba(220,216,216,0.3)',
            },
            slider: {
              bg: 'rgba(220,216,216,0.3)',
            },
            text: {
              primary: '#fff',
              secondary: grey[500],
            },
          }),
    },
  };

  return createTheme(themeToken);
};
