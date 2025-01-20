import React, { Suspense, useEffect } from 'react';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import routes from './routes';
import PageLoading from './common/PageLoading';
import usePageTitle from 'src/hooks/usePageTitle';
import { useUpdateStore, useAppData } from 'simple-redux-store';
// import Header from 'src/common/Header';

import Body from 'src/common/Body';
import './App.scss';
import Header from './common/Header';

dayjs.locale('zh-cn');

const outsidePathes = ['/login', '/forget'];

const App = () => {
  usePageTitle('admin');
  const updateStore = useUpdateStore();

  useEffect(() => {
    if (outsidePathes.includes(location.pathname)) {
      return;
    }
  }, [updateStore]);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#005cff',
        },
      }}
    >
      <BrowserRouter>
        <Layout className="app">
          <Header />
          <Layout>
            <Layout.Sider>
              
            </Layout.Sider>
            <Layout.Content>
              <Body>
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
              </Body>
            </Layout.Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
