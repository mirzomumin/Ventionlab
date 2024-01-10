import { useContext } from 'react';
import { AuthContext } from '../../shared/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
};
