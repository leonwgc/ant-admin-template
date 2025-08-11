import { Route, Routes } from 'react-router';
import AppLayout from './layouts/AppLayout';
import { lazy, Suspense } from 'react';

import { Logs, Log } from './modules/Log';
import { Users, AddUser, EditUser } from './modules/User';

import Callback from './modules/Common/Callback';
import StepsDemo from './modules/Demo/Steps.demo';

const NoPermission = lazy(() => import('./modules/NoPermission/NoPermission'));
const Welcome = lazy(() => import('./modules/Welcome/Welcome'));
const NotFound = lazy(() => import('./modules/NotFound/NotFound'));

/**
 * RouteConfig
 *
 * This component is used to define the routes of the application.
 *
 * @returns {JSX.Element} The routes of the application.
 */
const RouteConfig = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="callback" element={<Callback />} />
        <Route index element={<AppLayout />} /> // TODO: change to Login
        <Route path="register" element={<div>Register</div>} />
        <Route
          path="no-permission"
          element={<AppLayout hasSider={false} hasContentHeader={false} />}
        >
          <Route index element={<NoPermission />}></Route>
        </Route>
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Welcome />} />
          <Route path="components">
            <Route index path="steps" element={<StepsDemo />} />
          </Route>

          <Route path="users">
            <Route index element={<Users />} />
            <Route path="add" element={<AddUser />} />
            <Route path="edit" element={<EditUser />} />
          </Route>
          <Route path="logs">
            <Route index element={<Logs />} />
            <Route path="log" element={<Log></Log>} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouteConfig;
