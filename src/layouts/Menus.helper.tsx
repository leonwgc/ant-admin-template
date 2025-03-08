import { MenuProps } from '@derbysoft/neat-design';
import cloneDeep from 'lodash/cloneDeep';

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

export type SearchResult = {
  /**
   * The Menus paths, from parent to self
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
 * @param childItems the menu items to search
 * @param item the parent menu item
 * @param searchResult the result object
 */
export const searchMenusByPathname = (
  pathname: string,
  childItems: MenuItem[],
  item: MenuItem,
  searchResult: SearchResult
) => {
  if (!childItems || !childItems.length || searchResult.found) {
    return;
  }
  if (item) {
    // level 1 none.
    searchResult.parents.push(item);
  }

  for (let childItem of childItems) {
    if (childItem.route === pathname) {
      searchResult.parents.push(childItem);
      searchResult.found = true;
      return;
    } else {
      if (Array.isArray(childItem?.children)) {
        searchMenusByPathname(
          pathname,
          childItem?.children,
          childItem,
          searchResult
        );
      }
    }
  }
  if (!searchResult.found) {
    searchResult.parents.pop();
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
export const getFlatMenus = (items: MenuItem[]) => {
  const result: MenuItem[] = [];

  items.reduce((acc: MenuItem[], item: MenuItem) => {
    if (item.children) {
      acc.push(...getFlatMenus(item.children));
    } else {
      acc.push(item);
    }
    return acc;
  }, result);

  return result;
};


/**
 * Check if the current user has the required permission
 * @param operations The user's operations
 * @param permissions The required operations
 * @returns `true` if the user has the required permission, otherwise `false`
 */
export const hasPermission = (
  operations: string[] | undefined,
  permissions: string[] | undefined
) => {
  if (!Array.isArray(permissions) || !permissions?.length) {
    return true;
  }

  if (!Array.isArray(operations) || !operations?.length) {
    return false;
  }

  return permissions.every((item) => operations.includes(item));
};

/**
 * Get the menu items according to the user's permissions and visible setting
 * @param operations The user's operations
 * @param menus The menu items to filter (default is allMenuData)
 * @returns The menu items that the user can see
 */
export const getFilterMenus: (operations: string[], menus: MenuItem[]) => MenuItem[] = (operations, menus = []) => {
  const filterMenus = (items: MenuItem[]) => {
    return items.filter((item) => {
      if (
        hasPermission(operations, item.permissions) &&
        item.visible !== false
      ) {
        if (Array.isArray(item.children)) {
          item.children = filterMenus(item.children);

          if (!item.children.length) {
            return false;
          }
        }
        return true;
      }
      return false;
    });
  };

  return filterMenus(cloneDeep(menus));
};