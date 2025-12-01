import { Layout, SiderProps } from '@derbysoft/neat-design';
import { useEffect, useState } from 'react';
import { useLocalStorageState } from 'ahooks';
import Menus from './Menus';
import SkeletonLoading from './SkeletonLoading';
import { menus } from '~/config.menu';

type Props = SiderProps & {
  loading?: boolean;
};

export const NAV_MENU_COLLAPSED_KEY = 'NAV_MENU_COLLAPSED';

/**
 * A functional component that renders a collapsible sidebar (Sider) with a toggle button.
 * The sidebar's width and collapsed state are managed using local storage and React state.
 *
 * @param {Object} props - The props object.
 * @param {boolean} props.loading - Indicates whether the content inside the sidebar is loading.
 * @param {Object} props.rest - Additional props to be passed to the Layout.Sider component.
 *
 * @returns {JSX.Element} The rendered Sider component.
 */
export default ({ loading, ...props }: Props) => {
  const [value, setValue] = useLocalStorageState<boolean>(
    NAV_MENU_COLLAPSED_KEY,
    {
      defaultValue: false,
    }
  );

  const [collapsed, setCollapsed] = useState(value);

  return (
    <Layout.Sider
      // trigger={null}
      width={256}
      collapsedWidth={64}
      collapsible
      collapsed={collapsed}
      theme="light"
      onCollapse={setCollapsed}
      {...props}
    >
      <SkeletonLoading
        loading={loading}
        paragraph={{ rows: 2, width: value ? '100%' : ['50%', '100%'] }}
      >
        <Menus collapsed={collapsed} menus={menus} />
        {/* <Footer /> */}
      </SkeletonLoading>
    </Layout.Sider>
  );
};
