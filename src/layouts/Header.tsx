import React from 'react';
import { Layout, Avatar, Space } from 'antd';
import DerbySoftLogo from './Logo';
import { useAppData } from 'simple-redux-store';
import { MenuOutlined } from '@ant-design/icons';
import { useToggle } from 'ahooks';
import MobileMenus from './MobileMenus';

const Header: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  const { operations = [] } = useAppData();
  const [open, { setRight, setLeft }] = useToggle(false);
  return (
    <>
      <Layout.Header {...props}>
        <DerbySoftLogo />

        <Space size={16}>
          <MenuOutlined className="mobile-menus" onClick={setRight} />
          <Avatar>LW</Avatar>
        </Space>
      </Layout.Header>
      <MobileMenus open={open} onClose={setLeft} />
    </>
  );
};

export default Header;
