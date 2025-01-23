import { Layout, Menu, MenuProps, SiderProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number] & {
  children?: MenuItem[];
  route?: string;
};

/**
 * Get the associated menu items for a given pathname
 * @param pathname the pathname to search
 * @param childrenItems the menu items to search
 * @param item the parent menu item
 * @param result the result object
 */
export const getPathnameAssociatedMenu = (
  pathname: string,
  childrenItems: MenuItem[],
  item: MenuItem,
  result
) => {
  if (!childrenItems || !childrenItems.length || result.found) {
    return;
  }
  if (item) {
    // level 1 none.
    result.parents.push(item);
  }

  for (let menuItem of childrenItems) {
    if (menuItem.route === pathname) {
      result.parents.push(menuItem);
      result.found = true;
      return;
    } else {
      if (menuItem?.children) {
        getPathnameAssociatedMenu(
          pathname,
          menuItem?.children,
          menuItem,
          result
        );
      }
    }
  }
  if (!result.found) {
    result.parents.pop();
  }
};
