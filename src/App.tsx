import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import usePageTitle from '~/hooks/usePageTitle';
import { Route, Routes } from 'react-router';
import AppLayout from './AppLayout';
import './App.scss';

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
          <Route path="users" element={<div>Users</div>} />
          <Route path="users/add" element={<div>add user</div>} />
          <Route path="admins" element={<div>Admins</div>} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
};

export default App;
