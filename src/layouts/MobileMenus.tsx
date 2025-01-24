import React, { useEffect } from 'react';
import { Avatar, Drawer, DrawerProps } from 'antd';
import Menus from './Menus';
import useWindowSize from '~/hooks/useWindowSize';
import './MobileMenus.scss';

const MobileMenus: React.FC<DrawerProps> = (props) => {
  const { width } = useWindowSize();

  useEffect(() => {
    if (width > 768) {
      props.onClose?.(null);
    }
  }, [width]);

  const afterClick = () => {
    props.onClose?.(null);
  };

  return (
    <>
      <Drawer
        className="app-drawer__menus--mobile"
        title={<Avatar>LW</Avatar>}
        placement="left"
        width={320}
        {...props}
      >
        <Menus afterClick={afterClick} />
      </Drawer>
    </>
  );
};

export default MobileMenus;
