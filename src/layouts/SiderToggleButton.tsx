import React, { useCallback } from 'react';

// Components
import { Button } from '@derbysoft/neat-design';
// import { MenuCollapseOutlined, MenuExpandOutlined } from '@ant-design/icons';

// Vendors
import classNames from 'classnames';

import { useLatest } from 'ahooks';
// import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import {
  MenuCollapseOutlined,
  MenuExpandOutlined,
} from '@derbysoft/neat-design-icons';
import './SiderToggleButton.scss';

const SiderToggleButton = ({ onToggle, collapsed }) => {
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
      icon={collapsed ? <MenuExpandOutlined /> : <MenuCollapseOutlined />}
      onClick={handleToggleCollapse}
    />
  );
};

export default SiderToggleButton;
