import { Route, Routes } from 'react-router';
import AppLayout from './AppLayout';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import Logs from './pages/Logs';
import EditUser from './pages/Edituser';

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
        <Route index element={<div>Welcome Home</div>} />
        <Route path="users">
          <Route index element={<Users />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit" element={<EditUser />} />
        </Route>
        <Route path="logs" element={<Logs />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
      <Route path="*" element={<div>Login</div>} />
    </Routes>
  );
};

export default RouteConfig;
