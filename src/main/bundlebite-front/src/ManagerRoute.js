import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth , getUserRole } from './auth'; // Assuming you have an authentication hook

const ManagerRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>; // Loading state
  var role = getUserRole();
  return role === "manager" ? <Outlet /> : <Navigate to="/login" />;
};

export default ManagerRoute;