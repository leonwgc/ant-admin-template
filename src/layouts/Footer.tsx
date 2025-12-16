import React from 'react';
import { useLocalStorageState } from 'ahooks';
import { NAV_MENU_COLLAPSED_KEY } from './Sider';
import './Footer.scss';

const Footer = () => {
  const [value, _] = useLocalStorageState<boolean>(NAV_MENU_COLLAPSED_KEY, {
    listenStorageChange: true,
  });
  return (
    <div className="app-footer">
      <div>© 2002 - 2025 xxx Inc.</div>
      <div>All rights reserved. </div>
    </div>
  );
};

export default Footer;
