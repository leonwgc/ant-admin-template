import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, MenuProps, SiderProps } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SiderToggleButton from './SiderToggleButton';

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
  {
    key: '3',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
  },
];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

export default (props: SiderProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  const [openKeys, setOpenKeys] = useState<string[]>(['1']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['11']);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--menu-width',
      collapsed ? '56px' : '256px'
    );
  }, [collapsed]);

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
        onClick={(item) => history.push(item.key)}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys}
        onSelect={(item) => {
          setSelectedKeys([item.key]);
          // setOpenKeys(item.keyPath.slice(1));
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
