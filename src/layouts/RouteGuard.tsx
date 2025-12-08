import React, { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router';
import { hasPermission } from './Menus.helper';
import routePermissions from '~/config.route';
import { useAppStore } from '~/store';
interface RouteGuardProps {
  children: ReactNode;
  userPermissions?: string[];
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { operations = [] } = useAppStore();

  return !hasPermission(
    operations,
    routePermissions.find((item) => item.route === pathname)?.permissions
  ) ? (
    <Navigate to="/no-permission" replace />
  ) : (
    children
  );
};

export default RouteGuard;
