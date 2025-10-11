import { MailOutlined } from '@ant-design/icons';
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
};

export const menus: MenuItem[] = [
  {
    key: 'user',
    label: 'Users',
    icon: <MailOutlined />,
    permissions: [],
    children: [
      {
        key: 'user-1',
        label: 'User list',
        route: '/app/users',
        permissions: [],
      },
      {
        key: 'user-2',
        label: 'Expand Table',
        route: '/app/users/table',
        permissions: [],
      },
    ],
  },
  {
    key: 'form',
    label: 'Forms',
    icon: <MailOutlined />,
    permissions: [],
    children: [
      {
        key: 'form1',
        label: 'Form1',
        route: '/app/forms',
        permissions: [],
      },
      {
        key: 'dynamic-list',
        label: 'Dynamic List',
        route: '/app/forms/dynamic-list',
        permissions: [],
      },
      {
        key: 'virtual-list',
        label: 'Virtual List',
        route: '/app/forms/virtual-list',
        permissions: [],
      },
    ],
  },
];
