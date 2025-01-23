import React from 'react';
import { Layout, Avatar, Space } from 'antd';
import DerbySoftLogo from './Logo';
import { useAppData } from 'simple-redux-store';

const Header: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  const { operations = [] } = useAppData();
  return (
    <Layout.Header {...props}>
      <DerbySoftLogo />

      <Space size={64}>
        <div>operations:{operations.map((op) => op).join(',')}</div>
        <Avatar>W</Avatar>
      </Space>
    </Layout.Header>
  );
};

export default Header;
