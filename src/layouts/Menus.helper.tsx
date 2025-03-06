import { MenuProps } from '@derbysoft/neat-design';

export type MenuItem = Required<MenuProps>['items'][number] & {
  /**
   * menu item children
   */
  children?: MenuItem[];
  /**
   * menu item route
   */
  route?: string;
  /**
   * permissions needed to access this menu item
   */
  permissions?: string[];
  /**
   * whether this menu item is visible
   */
  visible?: boolean;
};

type Result = {
  /**
   * The associated menu items, from parent to self
   */
  parents: MenuItem[];
  /**
   * Whether the associated menu item is found
   */
  found: boolean;
};

/**
 * Get the associated menu item for a given pathname
 * @param pathname the pathname to search
 * @param childrenItems the menu items to search
 * @param item the parent menu item
 * @param result the result object
 */
export const getPathnameAssociatedMenu = (
  pathname: string,
  childrenItems: MenuItem[],
  item: MenuItem,
  result: Result
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

export type LevelKeysProps = {
  key?: string;
  children?: LevelKeysProps[];
};

export const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

/**
 * Get all menu items, nothing to do with permissions.
 * @param items the menu items to get
 * @returns all menu items
 */
export const getAllMenuItems = (items: MenuItem[]) => {
  const result: MenuItem[] = [];

  items.reduce((acc: MenuItem[], item: MenuItem) => {
    if (item.children) {
      acc.push(...getAllMenuItems(item.children));
    } else {
      acc.push(item);
    }
    return acc;
  }, result);

  return result;
};
