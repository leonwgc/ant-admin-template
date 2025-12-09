import React, { useState } from 'react';
import { Layout } from '@derbysoft/neat-design';
import { Outlet } from 'react-router';
import classNames from 'classnames';

import Header from './Header';
import Sider from './Sider';
import RouteGuard from './RouteGuard';

import SkeletonLoading from './SkeletonLoading';
import './AppLayout.scss';

const AppLayout: React.FC<{
  hasSider?: boolean;
  hasContentHeader?: boolean;
}> = ({ hasSider = true, hasContentHeader = false }) => {
  const [loading] = useState(false);

  return (
    <Layout className="app-layout">
      <Header className="app-layout__header" />
      <Layout className="app-layout__body">
        {hasSider && <Sider loading={loading} />}
        <Layout.Content
          className={classNames('app-layout__main', {
            'app-layout__main--no-sider': !hasSider,
          })}
        >
          <Layout className="app-layout__inner">
            {hasContentHeader && (
              <Layout.Header className="app-layout__inner-header">
                header
              </Layout.Header>
            )}

            <SkeletonLoading loading={loading} paragraph={{ rows: 5 }}>
              <Layout.Content className="app-layout__inner-content">
                <RouteGuard>
                  <Outlet />
                </RouteGuard>
              </Layout.Content>
            </SkeletonLoading>
          </Layout>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
