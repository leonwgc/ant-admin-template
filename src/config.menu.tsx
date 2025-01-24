import React from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { MenuItem } from './layouts/Menus.helper';
import operations from './config.operations';
import cloneDeep from 'lodash/cloneDeep';

export const allMenuData: MenuItem[] = [
  {
    key: 'user',
    label: 'Users',
    icon: <MailOutlined />,
    permissions: [operations.VIEW_USER],
    children: [
      {
        key: 'user-1',
        label: 'User list',
        route: '/app/users',
        permissions: [operations.VIEW_USER],
      },
      {
        key: 'user-2',
        label: 'add',
        route: '/app/users/add',
        permissions: [operations.CREATE_USER],
        visible: false,
      },
      {
        key: 'user-3',
        label: 'edit',
        route: '/app/users/edit',
        permissions: [operations.UPDATE_USER],
        visible: false,
      },
    ],
  },
  {
    key: 'log',
    label: 'Logs',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: 'log-1',
        label: 'logs',
        route: '/app/logs',
        permissions: [operations.VIEW_LOG],
      },
    ],
  },
  {
    key: 'template',
    label: 'Templates',
    icon: <SettingOutlined />,
    permissions: [operations.VIEW_TEMPLATE],
    children: [
      {
        key: 'template-1',
        label: 'List',
        route: '/app/templates',
        permissions: [operations.VIEW_TEMPLATE],
      },
      {
        key: 'template-2',
        label: 'Add',
        route: '/app/templates/add',
        permissions: [operations.CREATE_TEMPLATE],
      },
    ],
  },
];

/**
 * Check if the current user has the required permission
 * @param operations The user's operations
 * @param permissions The required operations
 * @returns `true` if the user has the required permission, otherwise `false`
 */
export const hasPermission = (
  operations: string[],
  permissions: string[] | undefined
) => {
  if (!Array.isArray(permissions) || !permissions?.length) {
    return true;
  }

  if (!operations) {
    return false;
  }

  return permissions.every((item) => operations.includes(item));
};

/**
 * Get the menu items according to the user's permissions and visible setting
 * @param permissions The user's operations
 * @returns The menu items that the user can see
 */
export const getItems: (permissions: string[]) => MenuItem[] = (operations) => {
  const filterItems = (items: MenuItem[]) => {
    return items.filter((item) => {
      if (
        hasPermission(operations, item.permissions) &&
        item.visible !== false
      ) {
        if (item.children) {
          item.children = filterItems(item.children);

          if (!item.children.length) {
            return false;
          }
        }
        return true;
      }
      return false;
    });
  };

  return filterItems(cloneDeep(allMenuData));
};
