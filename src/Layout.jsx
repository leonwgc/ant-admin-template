import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Route, Switch, Redirect } from 'react-router';
import Body from 'src/common/Body';
import Menus from './Menus';
import Nav from 'src/common/Nav';
import txlRoutes from './v2/txl/routes';
import { useAppData } from 'simple-redux-store';
// import { StyledAdminWrapper } from './common/StyledComponents';
import ErrorBoundary from 'src/common/ErrorBoundary';

const routes = [...txlRoutes];

export default function AdminLayout({ history }) {
  const { currentMenu = {} } = useAppData();

  const renderRedirectRoutes = () => {
    if (currentMenu && currentMenu.childs) {
      const to = currentMenu.childs[0].funUrl
        ? currentMenu.childs[0].funUrl // 3
        : currentMenu.childs[0]?.childs[0].funUrl; // 4

      if (to.startsWith('/')) {
        // normal
        return (
          <Route exact path={currentMenu.funUrl || '/'}>
            <Redirect to={to} />
          </Route>
        );
      } else if (to.startsWith('http' || to.startsWith('//'))) {
        if (to.indexOf('.html') === -1) {
          try {
            window.open(to, '_blank');
          } catch (ex) {}
        } else {
          // one
          return (
            <Route exact path={currentMenu.funUrl}>
              <Redirect to={`/one?url=${encodeURIComponent(to)}`} />
            </Route>
          );
        }
      }
    }
  };

  return (
    <Body bgColor="#fff" style={{ width: '100%' }}>
      <div style={{ display: 'flex' }}>
        <Menus />
        <div className="admin-wrapper">
          <Nav />
          <div>
            <Suspense fallback={<Spin spinning />}>
              <ErrorBoundary>
                <Switch>
                  {renderRedirectRoutes()}
                  {routes.map((route, idx) => (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  ))}
                  <Route render={() => <div>not found</div>}></Route>
                </Switch>
              </ErrorBoundary>
            </Suspense>
          </div>
        </div>
      </div>
    </Body>
  );
}
