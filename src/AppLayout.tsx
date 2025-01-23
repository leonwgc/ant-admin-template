import React, { Suspense } from 'react';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router';
import Sider from './Sider';
import Header from './Header';

import './AppLayout.scss';

const AppLayout: React.FC = () => {
  return (
    <Layout className="app-layout">
      <Header className="app-layout__header" />
      <Layout>
        <Sider className="app-layout__sider" />
        <Layout.Content className="app-layout__content">
          <Suspense fallback={<div>Loading...</div>}>hello</Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
