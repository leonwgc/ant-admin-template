import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { MenuProps } from '@derbysoft/neat-design';
import operations from './config.operations';

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
    key: 'components',
    label: 'Components',
    icon: <CopyOutlined />,
    children: [
      {
        key: 'components-steps',
        label: 'Steps',
        route: '/app/components/steps',
      },
    ],
  },
  {
    key: 'fadada',
    label: 'Fadada',
    icon: <CopyOutlined />,
    children: [
      {
        key: 'fadada-eui',
        label: 'EUI',
        route: '/app/fadada',
      },
      {
        key: 'fadada-tpl-list',
        label: 'Template List',
        route: '/app/fadada/template-list',
      },
      {
        key: 'fadada-sign',
        label: 'Sign',
        route: '/app/fadada/sign',
      },
    ],
  },
  {
    key: 'docusign',
    label: 'Docusign',
    icon: <CopyOutlined />,
    children: [
      {
        key: 'docusign-login',
        label: 'Docusign Login',
        route: '/app/docusign/login',
      },
      {
        key: 'docusign-users',
        label: 'Docusign Users',
        route: '/app/docusign/users',
      },
      {
        key: 'docusign-forms',
        label: 'Create Envelope and send',
        route: '/app/docusign/forms',
      },
    ],
  },
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
      {
        key: 'template-3',
        label: 'Edit',
        route: '/app/templates/edit',
        permissions: [operations.UPDATE_TEMPLATE],
      },
    ],
  },
  {
    key: 'logs',
    label: 'Logs',
    icon: <AppstoreOutlined />,
    permissions: [operations.VIEW_LOG],
    route: '/app/logs',
    children: [
      {
        key: 'log',
        label: 'Log',
        route: '/app/logs/log',
        permissions: [operations.VIEW_LOG],
      },
    ],
  },
];
