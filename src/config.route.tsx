import { Route, Routes } from 'react-router';
import AppLayout from './layouts/AppLayout';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import Logs from './pages/Logs';
import EditUser from './pages/Edituser';
import Templates from './pages/Templates';
import AddTemplate from './pages/AddTemplate';
import EditTemplate from './pages/EditTemplate';
import Log from './pages/Log';
import NoPermission from './pages/NoPermission';
import Welcome from './pages/Welcome';

/**
 * RouteConfig
 *
 * This component is used to define the routes of the application.
 *
 * @returns {JSX.Element} The routes of the application.
 */
const RouteConfig = () => {
  return (
    <Routes>
      <Route path="login" element={<div>Login</div>} />
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
  );
};

export default RouteConfig;
