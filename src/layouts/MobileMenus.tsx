import React, { useEffect } from 'react';
import { Drawer, DrawerProps } from 'antd';
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

  return (
    <>
      <Drawer
        className="app-drawer__menus--mobile"
        title="Basic Drawer"
        placement="left"
        width={320}
        {...props}
      >
        <Menus />
      </Drawer>
    </>
  );
};

export default MobileMenus;
