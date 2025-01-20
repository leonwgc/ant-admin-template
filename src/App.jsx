import React, { Suspense, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import routes from './routes';
import PageLoading from './common/PageLoading';
import usePageTitle from 'src/hooks/usePageTitle';
import { useUpdateStore, useAppData } from 'simple-redux-store';
// import { ThemeProvider, ErrorBoundary } from 'react-uni-comps';
import * as service from './service';
// import * as helper from 'src/utils/helper';
import Header from 'src/common/Header';
import Body from 'src/common/Body';
import './App.less';
// import { showError } from './common/msg';
// import { init, getOpenEnv } from 'src/v2/common/Open';

dayjs.locale('zh-cn');

const outsidePathes = ['/login', '/forget'];

const App = () => {
  usePageTitle('admin');
  const updateStore = useUpdateStore();

  useEffect(() => {
    if (outsidePathes.includes(location.pathname)) {
      return;
    }
    // Promise.all([service.getUnitInfo(), init()])
    //   .then(([unitInfo, { userInfo, orgInfo }]) => {
    //     // debugger;
    //     const env = getOpenEnv();
    //     updateStore({ unitInfo, orgInfo, userInfo, env, isWeb: env === 'web' });
    //   })
    //   .catch(showError);
  }, [updateStore]);

  const { color } = useAppData();

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
        <Header />
        <Body>
          <Suspense fallback={<PageLoading />}>
            <ErrorBoundary>
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
            </ErrorBoundary>
          </Suspense>
        </Body>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
