import { Suspense } from 'react';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import routes from './routes';
import PageLoading from './common/PageLoading';
import usePageTitle from '~/hooks/usePageTitle';
import { useUpdateStore } from 'simple-redux-store';

import './App.scss';
import Sider from './Sider';
import Header from './Header';

dayjs.locale('zh-cn');

const outsidePathes = ['/login', '/forget'];

const App = () => {
  usePageTitle('admin');

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
          <Header className="app-layout__header" />
          <Layout>
            <Sider className="app-layout__sider" />
            <Layout.Content className="app-layout__content">
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
