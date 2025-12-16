import { ConfigProvider, App as AntdApp } from '@derbysoft/neat-design';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import RouteConfig from './RouteConfig';
import './App.scss';

dayjs.locale('zh-cn');

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <AntdApp>
        <RouteConfig />
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
