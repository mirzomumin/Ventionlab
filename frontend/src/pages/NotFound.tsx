import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import NotFoundImg from '../assets/images/404.png';
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h1">{t('pages.notFound.headline')}</Typography>
            <Typography variant="h6">{t('pages.notFound.msg404')}.</Typography>
            <Button onClick={() => navigate('/')} variant="contained">
              {t('pages.notFound.btnText')}
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Box
              component="img"
              src={NotFoundImg}
              alt=""
              sx={{
                maxHeight: { xs: 250, md: 250 },
                maxWidth: { xs: 400, md: 400 },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
