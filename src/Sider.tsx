import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import {
  Layout,
  Menu,
  MenuProps,
  SiderProps,
  MenuItemProps,
  SubMenuProps,
} from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SiderToggleButton from './SiderToggleButton';
import { useMount } from 'ahooks';
import { SubMenuType } from 'antd/es/menu/interface';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '1',
    label: 'user management',
    icon: <MailOutlined />,
    children: [
      {
        key: '11',
        label: 'user list',
      },
      {
        key: '12',
        label: 'user data',
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
];

function getParentKeys(key, items, parent = []) {
  if (!items || !items.length) return;
  for (let item of items) {
    if (item.children && item.children?.includes(key)) {
      parent.push(item.key);
    } else {
      getParentKeys(key, item.children || [], parent);
    }
  }
}

export default (props: SiderProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  const [openKeys, setOpenKeys] = useState<string[]>([items[0].key as string]);
  const [selectedKeys, setSelectedKeys] = useState([items[0].children[1].key]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--menu-width',
      collapsed ? '56px' : '256px'
    );
  }, [collapsed]);

  useMount(() => {});

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
        onClick={(item) => history.push(item.key)}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        onSelect={({ key }) => {
          setSelectedKeys([key]);

          const parentKeys = [];
          getParentKeys(key, items, parentKeys);
          setOpenKeys(parentKeys);
        }}
        defaultOpenKeys={openKeys}
        mode="inline"
        items={items}
      />
      <SiderToggleButton collapsed={collapsed} onToggle={setCollapsed} />
    </Layout.Sider>
  );
};
