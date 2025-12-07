/**
 * @file src/utils/routeGenerator.tsx
 * @author leon.wang
 */

import { lazy, ComponentType, LazyExoticComponent } from 'react';
import { MenuItem } from '~/config.menu';

/**
 * Route component mapping configuration
 */
export interface RouteComponentMap {
  [path: string]: LazyExoticComponent<ComponentType<unknown>> | ComponentType<unknown>;
}

/**
 * Generated route configuration
 */
export interface GeneratedRoute {
  path: string;
  element: JSX.Element;
  permissions?: string[];
  children?: GeneratedRoute[];
}

/**
 * Extract all routes from menu items recursively
 *
 * @param menus - Menu items configuration
 * @returns Array of route paths with permissions
 */
export const extractRoutesFromMenus = (
  menus: MenuItem[]
): Array<{ path: string; permissions: string[] }> => {
  const routes: Array<{ path: string; permissions: string[] }> = [];

  const traverse = (items: MenuItem[]) => {
    items.forEach((item) => {
      if (item.route) {
        routes.push({
          path: item.route,
          permissions: item.permissions || [],
        });
      }
      if (item.children) {
        traverse(item.children);
      }
    });
  };

  traverse(menus);
  return routes;
};

/**
 * Lazy load page component
 *
 * @param importPath - Dynamic import path
 * @returns Lazy loaded component
 */
export const lazyLoad = (
  importPath: string
): LazyExoticComponent<ComponentType<unknown>> => {
  return lazy(() => import(`../${importPath}`));
};

/**
 * Generate route element from path and component map
 *
 * @param path - Route path
 * @param componentMap - Route component mapping
 * @returns Route element or null
 */
export const getRouteElement = (
  path: string,
  componentMap: RouteComponentMap
): JSX.Element | null => {
  const Component = componentMap[path];
  if (!Component) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(`No component found for route: ${path}`);
    }
    return null;
  }
  return <Component />;
};

/**
 * Map route paths to their corresponding components
 * This is the central mapping that connects routes to page components
 */
export const routeComponentMap: RouteComponentMap = {
  // CSS Features
  '/app/css': lazyLoad('pages/Form/CssFeature'),

  // User Management
  '/app/users': lazyLoad('pages/User/Users'),
  '/app/users/add': lazyLoad('pages/User/Add'),
  '/app/users/table': lazyLoad('pages/User/ExpandTable'),
  '/app/users/edit': lazyLoad('pages/User/Edit'),

  // Forms
  '/app/forms': lazyLoad('pages/Form/MyForm'),
  '/app/forms/dynamic-list': lazyLoad('pages/Form/DynamicList'),
  '/app/forms/virtual-list': lazyLoad('pages/Form/VirtualLists'),

  // React Hooks Examples
  '/app/hooks/use-transition': lazyLoad('pages/Hooks/UseTransition'),
  '/app/hooks/use-suspense': lazyLoad('pages/Hooks/UseSuspense'),
  '/app/hooks/use-ahooks-countdown': lazyLoad('pages/Hooks/UseAHooksCountdown'),
  '/app/hooks/verification-code-countdown': lazyLoad('pages/Hooks/VerificationCodeCountdown'),

  // JavaScript Features
  '/app/js-feature/intl-number-format': lazyLoad('pages/Js/IntlNumberFormatExample'),

  // Component Examples
  '/app/components/dot-status': lazyLoad('pages/Components/DotStatusExample'),
  '/app/components/verification-code': lazyLoad('pages/Components/VerificationCodeExample'),
  '/app/components/contact-info': lazyLoad('pages/Components/ContactInfoExample'),
  '/app/components/user-contact-card': lazyLoad('pages/Components/UserContactCardExample'),
  '/app/components/email-success-modal': lazyLoad('pages/Components/EmailSuccessModalExample'),
  '/app/components/verification-code-page': lazyLoad(
    'pages/Components/VerificationCodePageExample'
  ),
  '/app/components/masonry': lazyLoad('pages/Components/MasonryExample'),

  // Games
  '/app/games/tetris-3d': lazyLoad('pages/Games/Tetris3D'),
  '/app/games/flappy-birds-3d': lazyLoad('pages/Games/FlappyBirds3D'),
};
