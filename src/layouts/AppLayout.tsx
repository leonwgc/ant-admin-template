import React from 'react';
import { Layout } from '@derbysoft/neat-design';
import { Outlet } from 'react-router';
import Sider from './Sider';
import Header from './Header';

import './AppLayout.scss';
import classNames from 'classnames';

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
  return (
    <Layout className={'app-layout'}>
      <Header className="app-layout__header" />
      <Layout>
        {hasSider && <Sider className="app-layout__sider" />}
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
