import React, { ReactNode, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { hasPermission } from './Menus.helper';
import { MenuItem } from '~/config.menu';
import routePermissions from '~/config.route.permissions';

interface RouteGuardProps {
  children: ReactNode;
  operations: string[];
  menus: MenuItem[];
}

/**
 * RouteGuard component to protect routes based on user permissions.
 *
 * @component
 * @param {RouteGuardProps} props - The properties for the RouteGuard component.
 * @param {React.ReactNode} props.children - The child components to render if the user has permission.
 * @param {Array} [props.operations=[]] - The list of operations the user is allowed to perform.
 * @param {Array} props.menus - The list of menu items to check permissions against.
 */
const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  operations = [],
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      !hasPermission(
        operations,
        routePermissions.find((item) => item.route === pathname)?.permissions
      )
    ) {
      navigate('/no-permission', { replace: true });
    } else {
      console.log('authed');
    }
  }, [pathname]);

  return children;
};

export default RouteGuard;
