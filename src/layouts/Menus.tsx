import { Menu, MenuProps } from '@derbysoft/neat-design';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import type { MenuItem } from '../config.menu';
import {
  getFlatMenus,
  getFilterMenus,
  getLevelKeys,
  LevelKeysProps,
  getMenuPaths,
} from './Menus.helper';
import { useLocalStorageState } from 'ahooks';
import { NAV_MENU_COLLAPSED_KEY } from './Sider';

type Props = MenuProps & {
  afterClick?: () => void;
  collapsed?: boolean;
  menus?: MenuItem[];
};

const operations = [];

/**
 * Menus component renders a collapsible menu using the Neat Design library.
 *
 * @param {Props} props - The properties passed to the component.
 * @param {Function} props.afterClick - A callback function to be called after a menu item is clicked.
 * @param {boolean} props.collapsed - A boolean indicating whether the menu is collapsed.
 * @param {Array} props.menus - An array of menu items to be displayed.
 * @param {Object} props.menuProps - Additional properties to be passed to the Menu component.
 *
 * @returns {JSX.Element} The rendered Menu component.
 *
 */
export default (props: Props) => {
  const { afterClick, collapsed, menus, ...menuProps } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuCollapsed] = useLocalStorageState<boolean>(NAV_MENU_COLLAPSED_KEY);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const filterMenus = useMemo(
    () => getFilterMenus(operations, menus),
    [operations, menus]
  );
  const levelKeys = useMemo(
    () => getLevelKeys(filterMenus as LevelKeysProps[]),
    [filterMenus]
  );
  const flatMenus = useMemo(() => getFlatMenus(menus), [menus]);

  useEffect(() => {
    const paths = getMenuPaths(pathname, filterMenus);
    if (paths.length) {
      const key = paths[paths.length - 1].key as string;
      setSelectedKeys([key]);
      if (!menuCollapsed) {
        setOpenKeys(paths.slice(0, -1).map((item) => item.key) as string[]);
      }
    }
  }, [pathname, filterMenus]);

  const onOpenChange: MenuProps['onOpenChange'] = useCallback(
    (keys) => {
      const currentOpenKey = keys.find((key) => !openKeys.includes(key));

      if (currentOpenKey !== undefined) {
        const repeatIndex = keys
          .filter((key) => key !== currentOpenKey)
          .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

        setOpenKeys(
          keys
            .filter((_, index) => index !== repeatIndex)
            .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
        );
      } else {
        setOpenKeys(keys);
      }
    },
    [openKeys]
  );

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
