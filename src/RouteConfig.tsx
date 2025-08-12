import { Route, Routes } from 'react-router';
import AppLayout from './layouts/AppLayout';
import { lazy, Suspense } from 'react';
import { Users, AddUser, EditUser } from './pages/User';

const NoPermission = lazy(() => import('./pages/NoPermission/NoPermission'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

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
        <Route index element={<AppLayout />} />

        <Route
          path="no-permission"
          element={<AppLayout hasSider={false} hasContentHeader={false} />}
        >
          <Route index element={<NoPermission />}></Route>
        </Route>
        <Route path="app" element={<AppLayout />}>
          <Route path="users">
            <Route index element={<Users />} />
            <Route path="add" element={<AddUser />} />
            <Route path="edit" element={<EditUser />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouteConfig;
