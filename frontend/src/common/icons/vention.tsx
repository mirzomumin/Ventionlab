import { SvgIcon } from '@mui/material';
import React from 'react';
import { IconProps } from '../../types/props';

export const VentionIcon: React.FC<IconProps> = ({ onClick }) => {
  return (
    <SvgIcon onClick={onClick} sx={{ fontSize: '2.2rem', cursor: 'pointer' }}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="400.000000pt"
        height="400.000000pt"
        viewBox="0 0 300.000000 300.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="#5AFB7A" stroke="none">
          <path d="M830 1982 l0 -519 100 5 100 5 0 -494 0 -494 117 0 116 0 395 494 395 493 103 -4 104 -4 0 518 0 518 -117 0 -118 0 -385 -481 c-212 -265 -387 -485 -390 -489 -3 -4 -42 -9 -87 -11 l-83 -4 0 492 0 493 -125 0 -125 0 0 -518z m200 1 l0 -468 -72 2 -73 2 -3 465 -2 466 75 0 75 0 0 -467z m1175 -2 l0 -464 -90 2 -90 2 -390 -490 -390 -490 -82 0 -83 -1 0 466 0 466 92 -4 91 -3 395 493 395 493 76 -3 76 -3 0 -464z m-1136 -503 c-10 -18 -12 -19 -27 -5 -13 13 -13 19 -2 32 19 23 44 0 29 -27z" />
        </g>
      </svg>
    </SvgIcon>
  );
};
