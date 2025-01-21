import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Menu } from 'antd';
// import { Icon } from './index';

import { useUpdateStore, useAppData } from 'simple-redux-store';
// import { getSearchParams } from './utils/';
import { nanoid, styled, css, Icon } from 'react-uni-comps';
const { SubMenu } = Menu;

import menuData from './menuDataNew';
import URI from 'urijs';

const sep = '$';

const submenuActiveTitleCss = css`
  background-color: ${(props) => props.theme.color};
  color: #bfbfbf;
  svg {
    color: #fff;
  }
`;

const StyledSubMenu = styled(SubMenu)`
  &.collapsed {
    margin: 16px auto;

    .ant-menu-submenu-title {
      font-size: 0 !important;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      width: 40px;
      height: 40px;
      margin: 0 auto;
    }

    &.ant-menu-submenu-selected > .ant-menu-submenu-title {
      ${submenuActiveTitleCss}
    }

    .ant-menu-submenu-title {
      :hover {
        ${submenuActiveTitleCss};
      }
    }
  }

  .ant-menu-submenu-title {
    padding-left: 20px !important;

    .ant-menu-submenu-arrow {
      color: #bfbfbf;
      font-size: 16px;
      display: ${(props) => (props.noArrow ? 'none' : '')};
    }
  }
`;

const StyledIcon = styled(Icon)`
  font-size: 20px;
`;

const StyledMenuTop = styled.div`
  display: flex;
  background: #f5f7fa;
  border-top-left-radius: 8px;
  padding: 0 16px 0 20px;
  height: 48px;
  /* width: ${({ collapsed }) => (collapsed ? '48px' : '172px')} !important; */
  justify-content: ${({ collapsed }) =>
    collapsed ? 'center' : 'space-between'};

  .anticon {
    line-height: 48px;
  }
  .title {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #1a1a1a;
    line-height: 48px;
  }
`;

const StyledMenu = styled(Menu)`
  background: #f5f7fa;
  border-right: none;
  height: calc(100vh - 76px);
  /* width: ${({ collapsed = false }) => (collapsed ? '48px' : '172px')}; */
  font-size: 14px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }

  .ant-menu-submenu-title {
    padding-left: 16px;
    padding-right: 16px;
    height: 48px;
    line-height: 48px;

    color: #1a1a1a;
    font-weight: bolder;
  }
  .ant-menu-item {
    color: #1a1a1a;
    margin: 0 auto;

    &-selected {
      color: ${(props) => props.theme.color};
      background: rgba(0, 75, 204, 0.06);
      border-radius: 4px;

      &::after {
        display: none; // hide line
      }
    }
  }
  .ant-menu-submenu-arrow {
    opacity: ${({ collapsed = false }) => (collapsed ? 0 : 1)};
  }
`;

const setMenusWithId = (menus, parentId = '') => {
  for (let menu of menus) {
    if (!menu.set) {
      menu.id = `${parentId}${parentId ? sep : ''}${nanoid(10)}`;
      menu.set = true;
      if (menu.childs && Array.isArray(menu.childs)) {
        setMenusWithId(menu.childs, menu.id);
      }
    }
  }
};

export const getFlatMenus = (menus) => {
  if (!menus) return [];
  let ar = [];

  for (let m of menus) {
    ar.push(m);
    ar = ar.concat(getFlatMenus(m.childs));
  }

  return ar;
};

export const getMenuInfo = (menus, skipSetId = false) => {
  if (!skipSetId) {
    setMenusWithId(menus);
  }

  let parentMenusKeys = [];

  function getParentMenuKeys(menus) {
    for (let item of menus) {
      if (item.childs && !parentMenusKeys.includes(item.id)) {
        parentMenusKeys.push(item.id + '');
        getParentMenuKeys(item.childs);
      }
    }
  }

  getParentMenuKeys(menus);

  const flatMenus = getFlatMenus(menus);

  return {
    flatMenus,
    parentMenusKeys,
    menus,
    sep,
  };
};

const defaultIcon = 'icon-zhankai_line';

const isHideMenu = (item) => {
  const extra = item.extraInfo;
  if (item.hide) {
    return true;
  } else {
    try {
      if (extra) {
        const extraData = JSON.parse(extra);
        return extraData.hide;
      }
    } catch (ex) {}
  }

  return false;
};

const Menus = () => {
  const updateStore = useUpdateStore();
  const { menuCollapsed = false } = useAppData();
  const currentMenu = menuData;
  const history = useHistory();
  const { pathname, search } = useLocation();
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const menuInfo = useMemo(
    () => getMenuInfo(currentMenu?.childs || []),
    [currentMenu]
  );

  useEffect(() => {
    // menuInfo update , this update , ignore pathname for mutiple menu unfold
    const { flatMenus = [], sep } = menuInfo;
    if (flatMenus.length) {
      let menu = flatMenus.find((m) => m.funUrl === pathname);
      if (pathname === '/one') {
        if (search.indexOf('?') === 0) {
          const searchObj = URI(true);
          const { url = '' } = searchObj;
          menu = flatMenus.find((m) => m.funUrl === url);
        }
      }
      if (menu) {
        setSelectedKeys([menu.id]);

        if (menu.id.indexOf(sep) > -1) {
          let keys = menu.id.split(sep);
          if (!menuCollapsed) {
            setOpenKeys(keys.slice(0, keys.length - 1));
          }
        }
      }
    }
  }, [menuInfo, pathname, menuCollapsed, search]);

  const onClick = ({ key }) => {
    const { flatMenus = [] } = menuInfo;
    const item = flatMenus.find((m) => m.id === key);
    if (item) {
      setSelectedKeys([item.id]);
      if (item.funUrl.startsWith('http')) {
        if (item.funUrl.indexOf('.html') > -1) {
          history.push('/one?url=' + encodeURIComponent(item.funUrl));
        } else {
          try {
            window.open(item.funUrl, '_blank');
          } catch (ex) {}
        }
      } else {
        history.push(item.funUrl);
      }
    }
  };

  const getSubMenuClassName = (id) => {
    if (menuCollapsed) {
      if (openKeys.includes(id)) {
        return 'active collapsed';
      } else {
        return 'collapsed';
      }
    } else {
      return '';
    }
  };

  const menuRender = (menus = [], isFirst = true) => {
    const renderMenuNoChilds = (item) => {
      if (isFirst) {
        return menuCollapsed ? (
          <StyledSubMenu
            className={getSubMenuClassName(item.id)}
            collapsed={menuCollapsed}
            noArrow
            onTitleClick={() => history.push(item.funUrl)}
            key={item.id}
            title={menuCollapsed ? null : item.funTitle}
            icon={
              menuCollapsed ? (
                <StyledIcon
                  type={item.funLogo || defaultIcon}
                  style={{ color: '#8c8c8c', fontSize: 20 }}
                />
              ) : null
            }
          ></StyledSubMenu>
        ) : (
          <Menu.Item
            key={item.id}
            style={{ fontWeight: 'bolder', paddingLeft: 16 }}
          >
            {item.funTitle}
          </Menu.Item>
        );
      } else {
        return (
          <Menu.Item key={item.id} style={{ paddingLeft: 30 }}>
            {item.funTitle}
          </Menu.Item>
        );
      }
    };

    return menus.map((item) => {
      if (isHideMenu(item)) {
        return null;
      }
      if (!item.childs) {
        // no childs . e.g. settings
        return renderMenuNoChilds(item);
      } else {
        return (
          <StyledSubMenu
            className={getSubMenuClassName(item.id)}
            collapsed={menuCollapsed}
            key={item.id}
            title={menuCollapsed ? null : item.funTitle}
            icon={
              menuCollapsed ? (
                <StyledIcon
                  type={item.funLogo || defaultIcon}
                  style={{ color: '#8c8c8c', fontSize: 20 }}
                />
              ) : null
            }
          >
            {menuRender(item.childs, false)}
          </StyledSubMenu>
        );
      }
    });
  };
  return (
    <>
      <StyledMenu
        collapsed={menuCollapsed}
        mode={menuCollapsed ? 'vertical' : 'inline'}
        onClick={onClick}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={setOpenKeys}
      >
        {menuRender(menuInfo?.menus)}
      </StyledMenu>
    </>
  );
};

export default Menus;
