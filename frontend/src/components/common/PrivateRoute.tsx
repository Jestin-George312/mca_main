import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import type { Role } from '../../types';

interface PrivateRouteProps {
  allowedRoles?: Role[];
}

// Toggle to disable auth protection during frontend-only development.
// Set to `false` to restore normal authentication checks.
const DISABLE_AUTH = true;

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  if (DISABLE_AUTH) return <Outlet />;

  const { user, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
