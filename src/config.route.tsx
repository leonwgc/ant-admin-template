import { Route, Routes } from 'react-router';
import AppLayout from './layouts/AppLayout';
import { lazy, Suspense } from 'react';

const Users = lazy(() => import('./modules/User/Users'));
const AddUser = lazy(() => import('./modules/User/Add'));
const Logs = lazy(() => import('./modules/Log/Logs'));
const EditUser = lazy(() => import('./modules/User/Edit'));
const Templates = lazy(() => import('./modules/Template/Templates'));
const AddTemplate = lazy(() => import('./modules/Template/AddTemplate'));
const EditTemplate = lazy(() => import('./modules/Template/EditTemplate'));
const Log = lazy(() => import('./modules/Log/Log'));
const NoPermission = lazy(() => import('./modules/NoPermission/NoPermission'));
const Welcome = lazy(() => import('./modules/Welcome/Welcome'));

const Login = lazy(() => import('./modules/Login/Login'));
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
        <Route index element={<Login />} />
        <Route path="register" element={<div>Register</div>} />
        <Route
          path="no-permission"
          element={<AppLayout hasSider={false} hasContentHeader={false} />}
        >
          <Route index element={<NoPermission />}></Route>
        </Route>
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Welcome />} />
          <Route path="users">
            <Route index element={<Users />} />
            <Route path="add" element={<AddUser />} />
            <Route path="edit" element={<EditUser />} />
          </Route>
          <Route path="logs">
            <Route index element={<Logs />} />
            <Route path="log" element={<Log></Log>} />
          </Route>
          <Route path="templates">
            <Route index element={<Templates />} />
            <Route path="add" element={<AddTemplate />} />
            <Route path="edit" element={<EditTemplate />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouteConfig;
