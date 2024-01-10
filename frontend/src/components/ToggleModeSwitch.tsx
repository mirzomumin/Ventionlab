import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import * as React from 'react';
import { ToggleModeProps } from '../types/props';
import { Theme } from '../common/constants/state';

export const ToggleModeSwitch: React.FC<ToggleModeProps> = ({ mode, onClick }) => {
  return (
    <IconButton sx={{ ml: 1 }} onClick={onClick}>
      {mode === Theme.DARK ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
