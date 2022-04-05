import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../../api/user';

const RequireAuth = ({ children }) => {
  const { allowAdminPage } = useUser();
  const location = useLocation();

  if (allowAdminPage === 'pending') {
    return null;
  }

  if (allowAdminPage !== true) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
