import { ConfigProvider, App as AntdApp } from '@derbysoft/neat-design';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import RouteConfig from './RouteConfig';
import './App.scss';

dayjs.locale('zh-cn');

const App = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          // colorPrimary: '#00131c',
          // colorBgContainer: '#fff',
        },
        components: {
          Menu: {
            // itemColor: '#00131c',
            // itemSelectedColor: '#00131c',
            // itemHoverBg: '#EFFFFF',
            // itemSelectedBg: '#EDEEEF',
            // subMenuItemBg: '#fff',
            // iconSize: 20,
            // collapsedIconSize: 20,
            // iconMarginInlineEnd: 14,
            // itemMarginInline: 12, // margin left right
            // itemMarginBlock: 8, // margin top down
          },
        },
      }}
    >
      <AntdApp>
        <RouteConfig />
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
