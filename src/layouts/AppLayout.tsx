import React, { useEffect, useState } from 'react';
import { Layout } from '@derbysoft/neat-design';
import { Outlet } from 'react-router';
import classNames from 'classnames';
import { useAppData, useUpdateStore } from 'simple-redux-store';

import Header from './Header';
import Sider from './Sider';
import RouteGuard from './RouteGuard';

import './AppLayout.scss';
import operations from '~/config.operations';
import SkeletonLoading from './SkeletonLoading';

/**
 * AppLayout
 * @description AppLayout component
 * @param {boolean} [hasSider=true] Whether to render the Sider component
 * @param {boolean} [hasContentHeader=true] Whether to render the content header
 */
const AppLayout: React.FC<{
  hasSider?: boolean;
  hasContentHeader?: boolean;
}> = ({ hasSider = true, hasContentHeader = false }) => {
  const { operations: userOperations = [] } = useAppData();
  const updateStore = useUpdateStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      updateStore({
        operations: [
          operations.VIEW_USER,
          operations.CREATE_USER,
          operations.VIEW_TEMPLATE,
          operations.CREATE_TEMPLATE,
          operations.VIEW_LOG,
        ],
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout className={'app-layout'}>
      <Header className="app-layout__header" />
      <Layout>
        {hasSider && <Sider className="app-layout__sider" loading={loading} />}
        <Layout.Content
          className={classNames('app-layout__content', {
            'no-sider': !hasSider,
          })}
        >
          <Layout className="content-layout">
            {hasContentHeader && (
              <Layout.Header className="content-layout__header">
                header
              </Layout.Header>
            )}

            <SkeletonLoading loading={loading} paragraph={{ rows: 5 }}>
              <Layout.Content className="content-layout__content">
                <RouteGuard operations={userOperations}>
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
