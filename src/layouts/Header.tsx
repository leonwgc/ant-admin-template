import React from 'react';
import { Layout, Avatar, Space, Flex } from '@derbysoft/neat-design';
import DerbySoftLogo from './Logo';
import { MenuOutlined } from '@ant-design/icons';
import { useToggle } from 'ahooks';
import MobileMenus from './MobileMenus';
import { useBookEngineStore } from '~/store';

const Header: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  const { operations = [] } = useBookEngineStore();
  const [open, { setRight, setLeft }] = useToggle(false);
  return (
    <>
      <Layout.Header {...props}>
        <Flex
          align="center"
          gap={8}
          style={{ fontSize: 14, fontWeight: 'bold' }}
        >
          <DerbySoftLogo />
          Ant Admin
        </Flex>

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
