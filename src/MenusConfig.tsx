import React from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { MenuItem } from './Menus.helper';

// TODO: add operations config
export const items: MenuItem[] = [
  {
    key: 'user',
    label: 'Users',
    icon: <MailOutlined />,
    children: [
      {
        key: 'user-1',
        label: 'User list',
        route: '/app/users',
      },
      {
        key: 'user-2',
        label: 'add',
        route: '/app/users/add',
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
      },
    ],
  },
  {
    key: 'template',
    label: 'Templates',
    icon: <SettingOutlined />,
    children: [
      {
        key: 'template-1',
        label: 'Template List',
        route: '/app/templates',
      },
      {
        key: 'template-2',
        label: 'Add Template',
        route: '/app/templates/add',
      },
    ],
  },
];
