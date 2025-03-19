import React from 'react';
import './Footer.scss';
import { useLocalStorageState } from 'ahooks';
import { NAV_MENU_COLLAPSED_KEY } from './Sider';
import { CommonUseOutlined } from '@derbysoft/neat-design-icons';

const Footer = () => {
  const [value, _] = useLocalStorageState<boolean>(NAV_MENU_COLLAPSED_KEY, {
    listenStorageChange: true,
  });
  return (
    <div className="app-footer">
      {value ? (
        <CommonUseOutlined style={{ fontSize: 20 }} />
      ) : (
        <div>
          <div>© 2002 - 2025 xxx Inc.</div>
          <div>All rights reserved. </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
