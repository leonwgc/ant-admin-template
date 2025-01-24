import { Route, Routes } from 'react-router';
import AppLayout from './layouts/AppLayout';
import { lazy, Suspense } from 'react';

const Users = lazy(() => import('./pages/Users'));
const AddUser = lazy(() => import('./pages/AddUser'));
const Logs = lazy(() => import('./pages/Logs'));
const EditUser = lazy(() => import('./pages/Edituser'));
const Templates = lazy(() => import('./pages/Templates'));
const AddTemplate = lazy(() => import('./pages/AddTemplate'));
const EditTemplate = lazy(() => import('./pages/EditTemplate'));
const Log = lazy(() => import('./pages/Log'));
const NoPermission = lazy(() => import('./pages/NoPermission'));
const Welcome = lazy(() => import('./pages/Welcome'));

const Login = lazy(() => import('./pages/Login/Login'));

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
          <Route path="no-permission" element={<NoPermission />}></Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
        <Route path="*" element={<div>Login</div>} />
      </Routes>
    </Suspense>
  );
};

export default RouteConfig;
