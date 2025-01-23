import React from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { MenuItem } from './Menus.helper';

export const items: MenuItem[] = [
  {
    key: '1',
    label: 'user management',
    icon: <MailOutlined />,
    children: [
      {
        key: '11',
        label: 'User list',
        route: '/app/users',
      },
      {
        key: '12',
        label: 'Logs',
        route: '/app/logs',
      },
    ],
  },
  {
    key: '2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '21', label: 'Option 5' },
      { key: '22', label: 'Option 6' },
      {
        key: '23',
        label: 'Submenu',
        children: [
          { key: '231', label: 'Option 7' },
          { key: '232', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    key: '3',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
  },
];
