import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import usePageTitle from '~/hooks/usePageTitle';
import { Route, Routes } from 'react-router';
import AppLayout from './AppLayout';
import './App.scss';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import Logs from './pages/Logs';
import EditUser from './pages/Edituser';

dayjs.locale('zh-cn');

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
      <Routes>
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Register</div>} />
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
      </Routes>
    </ConfigProvider>
  );
};

export default App;
