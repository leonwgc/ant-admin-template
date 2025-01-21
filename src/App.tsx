import React, { Suspense, useEffect, useState } from 'react';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import routes from './routes';
import PageLoading from './common/PageLoading';
import usePageTitle from '~/hooks/usePageTitle';
import { useUpdateStore, useAppData } from 'simple-redux-store';

import Body from 'src/common/Body';
import './App.scss';
import Menus from './Menus';
import AppSiderToggleButton from './AppSiderToggleButton';

dayjs.locale('zh-cn');

const outsidePathes = ['/login', '/forget'];

const App = () => {
  usePageTitle('admin');
  const [collapsed, setCollapsed] = useState(false);

  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  const updateStore = useUpdateStore();

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--menu-width',
      collapsed ? '56px' : '256px'
    );
  }, [collapsed]);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#005cff',
          colorBgContainer: '#fff',
        },
      }}
    >
      <BrowserRouter>
        <Layout className="app-layout">
          <Layout.Header className="app-layout__header">hello</Layout.Header>
          <Layout>
            <Layout.Sider
              className="app-layout__sider"
              // trigger={null}
              width={256}
              collapsedWidth={64}
              collapsible
              // collapsed={collapsed}

              theme="light"
            >
              <Menus />
              <AppSiderToggleButton />
            </Layout.Sider>
            <Layout.Content>
              <Suspense fallback={<PageLoading />}>
                <Switch>
                  {routes.map((route, idx) => (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  ))}
                </Switch>
              </Suspense>
            </Layout.Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
