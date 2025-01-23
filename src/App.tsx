import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import RouteConfig from './config.route';
import './App.scss';
import { useTitle } from 'ahooks';

dayjs.locale('zh-cn');

const App = () => {
  useTitle('App');

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
