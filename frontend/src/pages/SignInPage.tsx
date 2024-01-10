import style from './SignIn.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input, Button, InputAdornment, Typography, Box, Alert, Link } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string } from 'zod';
import { useContext, useState } from 'react';
import { AuthContext } from '../shared/context/AuthContext';
import { config } from '../config';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ISingInInput {
  email: string;
  password: string;
}

const signInSchema = object({
  email: string({ required_error: 'Email is required' }).email('Email is invalid'),
  password: string({ required_error: 'Password is required' })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const SignInPage = () => {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const [isNotFound, setIsNotFound] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISingInInput>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<ISingInInput> = async (data) => {
    if (login) {
      const user = await login(data.email, data.password);
      if (Object.is(user, null)) {
        setIsNotFound(true);
      } else {
        navigate('/');
      }
    }
  };

  return (
    <Box className={style.root}>
      <Box className={style.left__side}></Box>
      <Box className={style.right__side}>
        <form className={style.signin} onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Typography variant={'h6'} className={style.form__headline}>
              {t('pages.signIn.headline')}
            </Typography>
          </Box>
          {isNotFound && (
            <Alert style={{ marginBottom: '4pt' }} severity="error">
              {t('forms.signIn.msg401')}
            </Alert>
          )}
          <Input
            autoComplete={'email'}
            error={!!errors['email']}
            startAdornment={
              <InputAdornment position="start">
                <AlternateEmailIcon />
              </InputAdornment>
            }
            placeholder={t('forms.signIn.emailPlaceholder')}
            type="email"
            fullWidth
            {...register('email', { required: true, maxLength: 10 })}
          />{' '}
          <br />
          {errors.email && <Alert severity="error"> {errors.email?.message} </Alert>}
          <Input
            startAdornment={
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            }
            placeholder={t('forms.signIn.passwordPlaceholder')}
            type="password"
            fullWidth
            error={!!errors['password']}
            {...register('password', { required: true })}
          />{' '}
          <br />
          {errors.password && <Alert severity="error"> {errors.password?.message} </Alert>}
          <Button fullWidth={true} type="submit" variant="contained" color="success">
            {t('forms.signIn.submit')}
          </Button>
          <Box>
            <Typography className={style.form__support}>
              {t('forms.signIn.helpMsg')}
              <Link sx={{ textDecoration: 'none' }} href={config.ADMIN_EMAIL}>
                {' '}
                {t('forms.signIn.helpAdmin')}
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
