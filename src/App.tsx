import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import usePageTitle from '~/hooks/usePageTitle';
import RouteConfig from './config.route';
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
      <RouteConfig />
    </ConfigProvider>
  );
};

export default App;
