import React, { useCallback } from 'react';

// Components
import { Button } from 'antd';
// import { MenuCollapseOutlined, MenuExpandOutlined } from '@ant-design/icons';

// Vendors
import classNames from 'classnames';

// Styles
// import './AppSiderToggleButton.scss';
import { useLatest } from 'ahooks';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const AppSiderToggleButton = ({ onToggle, collapsed }) => {
  const onToggleRef = useLatest(onToggle);

  const handleToggleCollapse = useCallback(() => {
    onToggleRef.current(!collapsed);
    document.documentElement.style.setProperty(
      '--menu-width',
      !collapsed ? '56px' : '256px'
    );
  }, [collapsed]);

  return (
    <Button
      className={classNames('app-layout__sider__toggle-button', {
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
