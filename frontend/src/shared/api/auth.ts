import axios from 'axios';
import { loginUrl, refreshTokenUrl } from './endpoints';

export const authService = {
  login: async (email: string, password: string) => {
    return axios.post(`${loginUrl}/`, {
      email,
      password,
    });
  },

  refreshToken: async (refresh: string) => {
    return axios.post(refreshTokenUrl, { refresh });
  },
};
