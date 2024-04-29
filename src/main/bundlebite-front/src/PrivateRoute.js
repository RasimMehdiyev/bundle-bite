import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth'; // Assuming you have an authentication hook

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Loading state

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;