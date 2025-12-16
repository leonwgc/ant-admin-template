import React from 'react';
import { Layout, Space, Flex } from 'antd';
import { MenuOutlined, RobotFilled } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import MobileMenus from './MobileMenus';

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
          <RobotFilled />
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
