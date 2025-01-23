import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, MenuProps, SiderProps } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import SiderToggleButton from './SiderToggleButton';
import {
  getPathnameAssociatedMenu,
  getLevelKeys,
  LevelKeysProps,
  MenuItem,
} from './Sider.helper';

const items: MenuItem[] = [
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

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

export default (props: SiderProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--menu-width',
      collapsed ? '56px' : '256px'
    );
  }, [collapsed]);

  const { pathname } = useLocation();

  useEffect(() => {
    // restore menu status
    const result = {
      parents: [],
      found: false,
    };
    getPathnameAssociatedMenu(pathname, items, null, result);
    if (result.found) {
      const parents = result.parents;
      setSelectedKeys([parents[parents.length - 1].key]);
      setOpenKeys(parents.slice(0, -1).map((item) => item.key));
    }
  }, [pathname]);

  /**
   * Click menu, collapse other same level open menus, keep menu focus concise.
   * @param keys the keys of opened menus
   */
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const currentOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = keys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setOpenKeys(
        keys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setOpenKeys(keys);
    }
  };

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
        onClick={(item) => {
          let index = item.keyPath.length - 1;
          let menu;
          let parentItems = items.slice();
          while (index > -1) {
            menu = parentItems.find((m) => m.key === item.keyPath[index]);
            parentItems = menu?.children || [];
            index--;
          }
          navigate(menu?.route);
        }}
        selectedKeys={selectedKeys}
        onSelect={(item) => {
          setSelectedKeys([item.key]);
        }}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        items={items}
      />
      <SiderToggleButton collapsed={collapsed} onToggle={setCollapsed} />
    </Layout.Sider>
  );
};
