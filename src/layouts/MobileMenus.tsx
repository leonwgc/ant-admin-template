import React, { useEffect } from 'react';
import { Avatar, Drawer, DrawerProps } from '@derbysoft/neat-design';
import Menus from './Menus';
import useWindowSize from '~/hooks/useWindowSize';
import { menus } from '~/config.menu';
import './MobileMenus.scss';

const MobileMenus: React.FC<DrawerProps> = (props) => {
  const { width } = useWindowSize();

  useEffect(() => {
    if (width > 768) {
      props.onClose?.(null);
    }
  }, [props, width]);

  const afterClick = () => {
    props.onClose?.(null);
  };

  return (
    <Drawer
      className="app-drawer__menus--mobile"
      title={<Avatar>LW</Avatar>}
      placement="left"
      styles={{
        body: {
          padding: 0,
        },
      }}
      width={320}
      {...props}
    >
      <Menus afterClick={afterClick} menus={menus} />
    </Drawer>
  );
};

export default MobileMenus;
