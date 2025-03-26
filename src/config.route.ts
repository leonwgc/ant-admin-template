import { menus } from './config.menu';
import operations from './config.operations';

// all routes which don't exist in menus.
const extraRoutes = [
  {
    route: '/app/users/add',
    permissions: [operations.CREATE_USER],
  },
  {
    route: '/app/users/edit',
    permissions: [operations.UPDATE_USER],
  },
];

export const getRoutes = (items) => {
  const result = [];

  items.reduce((acc, item) => {
    if (item.children) {
      acc.push(...getRoutes(item.children));
    } else {
      acc.push({
        rotue: item.route,
        permissions: item.permissions,
      });
    }
    return acc;
  }, result);

  return result;
};

/**
 * Combines the routes generated from the provided menus with additional routes.
 *
 * @param {Menu[]} menus - The list of menu items to generate routes from.
 * @param {Route[]} extraRoutes - Additional routes to be concatenated.
 * @returns {Route[]} The combined list of routes.
 */
export default getRoutes(menus).concat(extraRoutes);
