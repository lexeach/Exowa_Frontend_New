import { Navigate, Outlet } from 'react-router-dom';

import Logo from '@/UI/Container/Logo';
import React from 'react';
import { RootState } from '@/store'; // Adjust the import path as necessary
import { useSelector } from 'react-redux';

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const loading = useSelector((state: RootState) => state.auth.loading);

  if (loading) {
    return <Logo />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
