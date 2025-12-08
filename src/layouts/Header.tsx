import React from 'react';
import { Layout, Space, Flex } from '@derbysoft/neat-design';
// import DerbySoftLogo from './Logo';
import { MenuOutlined } from '@ant-design/icons';
import { useToggle } from 'ahooks';
import MobileMenus from './MobileMenus';
import { useAppStore } from '~/store';
import { AIRelatedFilled } from '@derbysoft/neat-design-icons';

const Header: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  const { operations = [] } = useAppStore();
  const [open, { setRight, setLeft }] = useToggle(false);
  return (
    <>
      <Layout.Header {...props}>
        <Flex
          align="center"
          gap={8}
          style={{ fontSize: 32, fontWeight: 'bold' }}
        >
          <AIRelatedFilled />
        </Flex>

        <Space size={16}>
          <MenuOutlined className="mobile-menus" onClick={setRight} />
          {/* <Avatar>LW</Avatar> */}
        </Space>
      </Layout.Header>
      <MobileMenus open={open} onClose={setLeft} />
    </>
  );
};

export default Header;
