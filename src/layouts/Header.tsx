import React from 'react';
import { Layout, Space, Flex } from '@derbysoft/neat-design';
import { MenuOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import MobileMenus from './MobileMenus';
import { AIRelatedFilled } from '@derbysoft/neat-design-icons';

const Header: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  const [open, { setTrue, setFalse }] = useBoolean(false);
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
          <MenuOutlined className="mobile-menus" onClick={setTrue} />
          {/* <Avatar>LW</Avatar> */}
        </Space>
      </Layout.Header>
      <MobileMenus open={open} onClose={setFalse} />
    </>
  );
};

export default Header;
