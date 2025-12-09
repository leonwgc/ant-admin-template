import { Layout, SiderProps } from '@derbysoft/neat-design';
import { FC, useEffect, useState } from 'react';
import { useLocalStorageState } from 'ahooks';
import Menus from './Menus';
import SkeletonLoading from './SkeletonLoading';
import { menus } from '~/config.menu';
import './Sider.scss';

type Props = SiderProps & {
  loading?: boolean;
};

export const NAV_MENU_COLLAPSED_KEY = 'NAV_MENU_COLLAPSED';

const Sider: FC<Props> = ({ loading }) => {
  const [value, setValue] = useLocalStorageState<boolean>(
    NAV_MENU_COLLAPSED_KEY,
    {
      defaultValue: false,
    }
  );

  const [collapsed, setCollapsed] = useState(value);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--menu-width',
      collapsed ? '56px' : '256px'
    );

    setValue(collapsed);
  }, [collapsed, setValue]);

  return (
    <Layout.Sider
      width={256}
      collapsedWidth={64}
      collapsible
      collapsed={collapsed}
      theme="light"
      onCollapse={setCollapsed}
      className="app-sider"
    >
      <SkeletonLoading loading={loading}>
        <div className="app-sider__content">
          <Menus collapsed={collapsed} menus={menus} />
        </div>
      </SkeletonLoading>
    </Layout.Sider>
  );
};

export default Sider;
