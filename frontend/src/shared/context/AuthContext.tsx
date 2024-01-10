import React, { createContext, useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { IJWTUserPayload } from '../../types/auth';

type AuthContextStore = {
  login?: (email: string, password: string) => Promise<IJWTUserPayload | null>;
  logout?: () => void;
  user?: IJWTUserPayload | null;
};

export const AuthContext = createContext<AuthContextStore>({});

export interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken') as string) : null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<null | IJWTUserPayload>(() =>
    localStorage.getItem('authToken')
      ? jwtDecode(JSON.parse(localStorage.getItem('authToken') as string).access)
      : null,
  );

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      setAuthToken(response.data);
      localStorage.setItem('authToken', JSON.stringify(response.data));
      const signedUser = jwtDecode(response.data.access) as IJWTUserPayload;
      setUser(signedUser);
      return signedUser;
    } catch (e) {
      return null;
    }
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/sign-in');
  };

  const updateToken = async () => {
    const response = await api.refreshToken(authToken?.refresh);
    if (response.status === 200) {
      setAuthToken(response.data);
      localStorage.setItem('authToken', JSON.stringify({ ...authToken, access: response.data.access }));
      setUser(jwtDecode(response.data.access));
    } else {
      logout();
    }

    if (isLoading) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      updateToken().then();
    }

    const intervalDelay = 1000 * (60 * 5);

    const interval = setInterval(() => {
      if (authToken) {
        updateToken().then().catch();
      }
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [authToken, isLoading]);

  const providerValue = {
    login: login,
    logout: logout,
    user: user,
  };

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};
