import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router';
import Sider from './Sider';
import Header from './Header';

import './AppLayout.scss';

const AppLayout: React.FC = () => {
  useEffect(() => {
    console.log('layout render');
  }, []);

  return (
    <Layout className="app-layout">
      <Header className="app-layout__header" />
      <Layout>
        <Sider className="app-layout__sider" />
        <Layout.Content className="app-layout__content">
          <Layout className="content-layout">
            <Layout.Header className="content-layout__header">
              header
            </Layout.Header>
            <Layout.Content className="content-layout__content">
              <Outlet />
            </Layout.Content>
          </Layout>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
