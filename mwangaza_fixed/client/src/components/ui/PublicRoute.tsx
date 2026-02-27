import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PublicRoute: React.FC = () => {
  const { token } = useAuth();
  return !token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
