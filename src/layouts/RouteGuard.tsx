import React, { ReactNode, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router';
import { Spin } from '@derbysoft/neat-design';
import { hasPermission } from './Menus.helper';
import allMenuRoutes from '~/config.route';
import { useAppStore } from '~/store';
import { getCurrentUser } from '~/services/auth';
interface RouteGuardProps {
  children: ReactNode;
  userPermissions?: string[];
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { pathname } = useLocation();
  const {
    user,
    authInitialized,
    operations = [],
    setUser,
    setAuthInitialized,
  } = useAppStore();

  useEffect(() => {
    if (authInitialized) return;

    getCurrentUser()
      .then((currentUser) => setUser(currentUser))
      .catch(() => setUser(null))
      .finally(() => setAuthInitialized(true));
  }, [authInitialized, setAuthInitialized, setUser]);

  if (!authInitialized) {
    return <Spin className="route-guard__loading" />;
  }

  if (!user) {
    const redirect = encodeURIComponent(
      `${pathname}${window.location.search}`,
    );
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  return !hasPermission(
    operations,
    allMenuRoutes.find((item) => item.route === pathname)?.permissions
  ) ? (
    <Navigate to="/no-permission" replace />
  ) : (
    children
  );
};

export default RouteGuard;
