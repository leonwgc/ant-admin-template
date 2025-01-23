import { Menu, MenuProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  getPathnameAssociatedMenu,
  getLevelKeys,
  LevelKeysProps,
  getAllMenuItems,
} from './Menus.helper';
import { getItems, hasPermission, allMenuData } from '../config.menu';
import { useAppData } from 'simple-redux-store';

export default (props: MenuProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { operations = [] } = useAppData();

  const items = useMemo(() => getItems(operations), [operations]);

  const levelKeys = useMemo(() => {
    return getLevelKeys(getItems(operations) as LevelKeysProps[]);
  }, [operations]);

  const menuItems = useMemo(() => {
    return getAllMenuItems(allMenuData);
  }, [operations]);

  useEffect(() => {
    // restore menu from pathname
    const result = {
      parents: [],
      found: false,
    };
    let currentPath = pathname;

    // access control
    if (
      !hasPermission(
        operations,
        menuItems.find((item) => item.route === pathname)?.permissions
      )
    ) {
      navigate('./no-permission', { replace: true });
      return;
    }

    while (!result.found && currentPath) {
      getPathnameAssociatedMenu(currentPath, items, null, result);
      if (result.found) {
        const parents = result.parents;
        const key = parents[parents.length - 1].key;
        setSelectedKeys([key]);
        setOpenKeys(parents.slice(0, -1).map((item) => item.key));
      }
      if (result.found || currentPath === '/' || !currentPath) {
        break;
      }
      currentPath = currentPath.split('/').slice(0, -1).join('/');
    }
    if (!result.found) {
      // fallback to first menu
      setSelectedKeys([items[0].children[0].key as string]);
      setOpenKeys([items[0].key as string]);
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
        const menu = menuItems.find((m) => m.key === item.key);
        if (menu?.route) {
          navigate(menu?.route);
        }
      }}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      items={items}
      {...props}
    />
  );
};
