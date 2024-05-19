import React, { useEffect, useState } from 'react';
import { useAuth, getUserRole } from './auth';
import { Outlet, Navigate } from 'react-router-dom';

const ManagerRoute = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true); // State to track role loading

  useEffect(() => {
    const fetchRole = async () => {
      const fetchedRole = await getUserRole(); // Asynchronous call to getUserRole
      setRole(fetchedRole);
      setRoleLoading(false); // Update role loading state
    };

    if (!loading) { // Only fetch role if user data is already loaded
      fetchRole();
    }
  }, [loading]); // Dependency on loading ensures this runs once user load state stabilizes

  if (loading || roleLoading) {
    return <div>Loading...</div>; // Show loading while user or role is still being fetched
  }

  // Debugging output
  console.log(role);

  // Route guard based on the role
  return role === "manager" ? <Outlet /> : <Navigate to="/login" />;
};

export default ManagerRoute;
