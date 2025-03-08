import React from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  CopyOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { MenuItem } from './layouts/Menus.helper';
import operations from './config.operations';

export const menus: MenuItem[] = [
  {
    key: 'fadada',
    label: 'Fadada',
    icon: <CopyOutlined />,
    children: [
      {
        key: 'fadada-eui',
        label: 'EUI',
        icon: <RightOutlined style={{ fontSize: 14 }} />,
        route: '/app/fadada',
      },
      {
        key: 'fadada-tpl-list',
        label: 'Template List',
        icon: <RightOutlined style={{ fontSize: 14 }} />,
        route: '/app/fadada/template-list',
      },
      {
        key: 'fadada-sign',
        label: 'Sign',
        icon: <RightOutlined style={{ fontSize: 14 }} />,
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
        icon: <RightOutlined style={{ fontSize: 14 }} />,
        route: '/app/docusign/login',
      },
      {
        key: 'docusign-users',
        label: 'Docusign Users',
        icon: <RightOutlined style={{ fontSize: 14 }} />,
        route: '/app/docusign/users',
      },
      {
        key: 'docusign-forms',
        label: 'Create Envelope and send',
        icon: <RightOutlined style={{ fontSize: 14 }} />,
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
    key: 'log',
    label: 'Logs',
    icon: <AppstoreOutlined />,
    // permissions: [operations.VIEW_LOG],
    route: '/app/logs',
  },
];


