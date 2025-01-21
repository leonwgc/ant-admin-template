import { Layout, SiderProps, MenuProps, Menu } from 'antd';
import { useState, useEffect } from 'react';
import SiderToggleButton from './SiderToggleButton';
// import Menus from './Menus';
import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      {
        key: 'g1',
        label: 'Item 1',
      },
      {
        key: 'g2',
        label: 'Item 2',
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
  {
    key: 'grp',
    label: 'Group',
    type: 'group',
    children: [
      { key: '13', label: 'Option 13' },
      { key: '14', label: 'Option 14' },
    ],
  },
];

export default (props: SiderProps) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--menu-width',
      collapsed ? '56px' : '256px'
    );
  }, [collapsed]);

  return (
    <Layout.Sider
      trigger={null}
      width={256}
      collapsedWidth={64}
      collapsible
      collapsed={collapsed}
      theme="light"
      {...props}
    >
      <Menu
        // onClick={onClick}
        // style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
      <SiderToggleButton collapsed={collapsed} onToggle={setCollapsed} />
    </Layout.Sider>
  );
};
