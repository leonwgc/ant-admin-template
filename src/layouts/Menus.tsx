import { Menu, MenuProps } from '@derbysoft/neat-design';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAppData } from 'simple-redux-store';
import type { MenuItem } from '../config.menu';
import {
  getFlatMenus,
  getFilterMenus,
  getLevelKeys,
  searchMenusByPathname,
  LevelKeysProps,
  SearchResult
} from './Menus.helper';
import './Menus.scss';

type Props = MenuProps & { afterClick?: () => void; collapsed?: boolean; menus: MenuItem[]; };

export default (
  props: Props
) => {
  const { afterClick, collapsed, menus, ...menuProps } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { operations = [] } = useAppData();

  const filterMenus = useMemo(() => getFilterMenus(operations, menus), [operations, menus]);
  const levelKeys = useMemo(() => getLevelKeys(filterMenus as LevelKeysProps[]), [filterMenus]);
  const flatMenus = useMemo(() => getFlatMenus(menus), [menus]);

  useEffect(() => {
    const searchResult: SearchResult = {
      paths: [],
      found: false,
    };

    let currentPath = pathname;

    while (!searchResult.found && currentPath) {
      searchMenusByPathname(currentPath, filterMenus, null, searchResult);
      if (searchResult.found) {
        const parents = searchResult.paths;
        const key = parents[parents.length - 1].key as string;
        setSelectedKeys([key]);
        setOpenKeys(parents.slice(0, -1).map((item) => item.key) as string[]);
      }
      if (searchResult.found || currentPath === '/' || !currentPath) {
        break;
      }
      currentPath = currentPath.split('/').slice(0, -1).join('/');
    }
    if (!searchResult.found) {
      // fallback to first menu
      setSelectedKeys([filterMenus[0].children[0].key as string]);
      setOpenKeys([filterMenus[0].key as string]);
    }
  }, [pathname, filterMenus]);

  // only expand one level menu.
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const currentOpenKey = keys.find((key) => !openKeys.includes(key));

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
      style={{ borderInlineEnd: 'none' }}
      onClick={(item) => {
        const menu = flatMenus.find((m) => m.key === item.key);
        if (menu?.route) {
          navigate(menu?.route);

          afterClick?.();
        }
      }}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      items={filterMenus}
      inlineCollapsed={collapsed}
      {...menuProps}
    />
  );
};
