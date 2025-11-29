import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import api from '../utils/api';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, token, setAuth, logout } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (token && !user) {
        try {
          const { data } = await api.get('/auth/me');
          setAuth(token, data);
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };
    verifyAuth();
  }, [token, user, setAuth, logout]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;