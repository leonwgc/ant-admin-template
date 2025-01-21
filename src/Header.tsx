import React from 'react';
import { Layout, Avatar } from 'antd';
import DerbySoftLogo from './Logo';

const Header: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <Layout.Header {...props}>
      <DerbySoftLogo />
      <Avatar />
    </Layout.Header>
  );
};

export default Header;
