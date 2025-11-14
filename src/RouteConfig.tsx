import { Route, Routes } from 'react-router';
import AppLayout from './layouts/AppLayout';
import { lazy, Suspense } from 'react';
import { Users, AddUser, EditUser } from './pages/User';
import Redirect from './components/Redirect';

const NoPermission = lazy(() => import('./pages/NoPermission/NoPermission'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const Form = lazy(() => import('./pages/Form/MyForm'));
const DynamicList = lazy(() => import('./pages/Form/DynamicList'));
const VirtualList = lazy(() => import('./pages/Form/VirtualLists'));

const ExpandTable = lazy(() => import('./pages/User/ExpandTable'));

const CssFeature = lazy(() => import('./pages/Form/CssFeature'));

const UseTransition = lazy(() => import('./pages/Hooks/UseTransition'));

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
        <Route path="/" element={<Redirect to="/app/users/table" />} />

        <Route
          path="no-permission"
          element={<AppLayout hasSider={false} hasContentHeader={false} />}
        >
          <Route index element={<NoPermission />}></Route>
        </Route>
        <Route path="app" element={<AppLayout />}>
          <Route path="css">
            <Route index element={<CssFeature />} />
          </Route>
          <Route path="users">
            <Route index element={<Users />} />
            <Route path="add" element={<AddUser />} />
            <Route path="table" element={<ExpandTable />} />
            <Route path="edit" element={<EditUser />} />
          </Route>
          <Route path="forms">
            <Route index element={<Form />} />
            <Route path="dynamic-list" element={<DynamicList />} />
            <Route path="virtual-list" element={<VirtualList />} />
          </Route>
          <Route path="hooks">
            <Route path="use-transition" element={<UseTransition />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouteConfig;
