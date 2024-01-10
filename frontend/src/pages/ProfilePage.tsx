import { Box, SxProps, Theme, Typography } from '@mui/material';
import * as React from 'react';
import { TabProps } from '../types/props';
import DefaultUser from '../assets/images/default_user.png';

const TabEl: React.FC<TabProps> = ({ sx, content }) => {
  return (
    <Box sx={sx}>
      <Box>
        <Typography>{content}</Typography>
      </Box>
    </Box>
  );
};

const ProfileSepTabs = () => {
  const tabSx: SxProps<Theme> = {
    borderTop: 1,
    height: 1,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const tabContainerSx: SxProps<Theme> = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    height: 1,
  };

  return (
    <Box
      sx={{
        height: '17%',
      }}
    >
      <Box sx={tabContainerSx}>
        <TabEl sx={{ ...tabSx, borderRight: 1 }} content="Courses" />
        <TabEl sx={{ ...tabSx, borderRight: 1 }} content="Internships" />
        <TabEl sx={tabSx} content="Favorites" />
      </Box>
    </Box>
  );
};

const ProfileInfo = () => {
  return (
    <Box sx={{ height: 1 }}>
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          minHeight: '83%',
        }}
      >
        <Box
          component="div"
          sx={{
            width: '25%',
            borderRight: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            sx={{
              height: 167,
              width: 250,
              maxHeight: { xs: 87, md: 167 },
              maxWidth: { xs: 180, md: 210 },
              borderRadius: '50%',
            }}
            src={DefaultUser}
          />
        </Box>

        <Box sx={{ padding: '20pt' }}>
          <Typography>Description</Typography>
        </Box>
      </Box>
      <ProfileSepTabs />
    </Box>
  );
};

export const ProfilePage = () => {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderColor: 'text.primary',
      }}
    >
      <Box
        component="div"
        sx={{
          minWidth: '80%',
          border: 1,
          borderTop: 0,
          borderRadius: '16pt',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          height: '200pt',
          bgcolor: 'background.prima',
        }}
      >
        <ProfileInfo />
      </Box>
    </Box>
  );
};
