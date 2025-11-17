import {
  ExperimentOutlined,
  UserOutlined,
  FormOutlined,
  ApiOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
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
    key: 'css',
    label: 'CSS Feature',
    icon: <ExperimentOutlined />,
    permissions: [],
    children: [
      {
        key: 'css-1',
        label: 'CSS New Features',
        route: '/app/css',
        permissions: [],
      },
    ],
  },
  {
    key: 'user',
    label: 'Users',
    icon: <UserOutlined />,
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
    icon: <FormOutlined />,
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
  {
    key: 'hooks',
    label: 'React Hooks',
    icon: <ApiOutlined />,
    permissions: [],
    children: [
      {
        key: 'use-transition',
        label: 'useTransition',
        route: '/app/hooks/use-transition',
        permissions: [],
      },
      {
        key: 'use-suspense',
        label: 'Suspense',
        route: '/app/hooks/use-suspense',
        permissions: [],
      },
    ],
  },
  {
    key: 'components',
    label: 'Components',
    icon: <AppstoreOutlined />,
    permissions: [],
    children: [
      {
        key: 'dot-status',
        label: 'DotStatus',
        route: '/app/components/dot-status',
        permissions: [],
      },
    ],
  },
];
