import React, { useCallback } from 'react';

// Components
import { Button } from 'antd';
// import { MenuCollapseOutlined, MenuExpandOutlined } from '@ant-design/icons';

// Vendors
import classNames from 'classnames';

// Styles
import './AppSiderToggleButton.scss';
import { useToggle } from 'ahooks';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const AppSiderToggleButton = () => {
  const [collapsed, { toggle }] = useToggle();

  const handleToggleCollapse = useCallback(() => {
    toggle?.();
    document.documentElement.style.setProperty(
      '--menu-width',
      !collapsed ? '56px' : '256px'
    );
  }, [collapsed, toggle]);

  return (
    <Button
      className={classNames('app-layout__toggle-button', {
        collapsed: collapsed,
        expanded: !collapsed,
      })}
      type="primary"
      icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      onClick={handleToggleCollapse}
    />
  );
};

export default AppSiderToggleButton;
