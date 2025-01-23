import { Menu, MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  getPathnameAssociatedMenu,
  getLevelKeys,
  LevelKeysProps,
} from './Menus.helper';
import { items } from './MenusConfig';

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

export default (props: MenuProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    // restore menu from pathname
    const result = {
      parents: [],
      found: false,
    };
    let currentPath = pathname;
    while (!result.found && currentPath) {
      getPathnameAssociatedMenu(currentPath, items, null, result);
      if (result.found) {
        const parents = result.parents;
        setSelectedKeys([parents[parents.length - 1].key]);
        setOpenKeys(parents.slice(0, -1).map((item) => item.key));
      } else {
        setSelectedKeys([items[0].children[0].key as string]);
        setOpenKeys([items[0].key as string]);
      }
      if (result.found || currentPath === '/' || !currentPath) {
        break;
      }
      currentPath = currentPath.split('/').slice(0, -1).join('/');
    }
  }, [pathname]);

  // only expand one level menu.
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const currentOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

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
      {...props}
    />
  );
};
