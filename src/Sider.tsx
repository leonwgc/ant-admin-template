import { Layout, SiderProps } from 'antd';
import { useState, useEffect } from 'react';
import AppSiderToggleButton from './AppSiderToggleButton';
import Menus from './Menus';

export default (props: SiderProps) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--menu-width',
      collapsed ? '56px' : '256px'
    );
  }, [collapsed]);

  return (
    <Layout.Sider
      // trigger={null}
      width={256}
      collapsedWidth={64}
      collapsible
      // collapsed={collapsed}

      theme="light"
      {...props}
    >
      <Menus />
      <AppSiderToggleButton />
    </Layout.Sider>
  );
};
