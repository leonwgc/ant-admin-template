import { Layout, SiderProps, Skeleton } from '@derbysoft/neat-design';
import { useEffect, useState } from 'react';
import SiderToggleButton from './SiderToggleButton';
import Menus from './Menus';
import { menus } from '~/config.menu';
import SkeletonLoading from './SkeletonLoading';

type Props = SiderProps & {
  loading?: boolean;
};

/**
 * Sider
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default ({ loading, ...props }: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--menu-width',
      collapsed ? '56px' : '256px'
    );
  }, [collapsed]);

  return (
    <Layout.Sider
      trigger={null}
      width={256}
      collapsedWidth={64}
      collapsible
      collapsed={collapsed}
      theme="light"
      {...props}
    >
      <SkeletonLoading loading={loading} paragraph={{ rows: 2 }}>
        <Menus collapsed={collapsed} menus={menus} />
        <SiderToggleButton collapsed={collapsed} onToggle={setCollapsed} />
      </SkeletonLoading>
    </Layout.Sider>
  );
};
