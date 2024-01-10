import React from 'react';
import { PaletteMode } from '@mui/material';
import { SxProps } from '@mui/material';

interface IBaseProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface IconProps extends IBaseProps {}
export interface ToggleModeProps extends IBaseProps {
  mode: PaletteMode;
}

export interface TabProps {
  sx?: SxProps;
  content: string;
}
