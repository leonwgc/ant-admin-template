import React, { ReactNode, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { hasPermission, getFlatMenus } from './Menus.helper';
import { MenuItem } from '~/config.menu';

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
const RouteGuard: React.FC<RouteGuardProps> = ({ children, operations = [], menus }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const flatMenus = useMemo(() => getFlatMenus(menus), [menus]);

    useEffect(() => {
        if (
            !hasPermission(
                operations,
                flatMenus.find((item) => item.route === pathname)?.permissions
            )
        ) {
            navigate('/no-permission', { replace: true });
        }
    }, [pathname]);

    return children;
};

export default RouteGuard;