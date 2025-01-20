import { Layout, Avatar } from 'antd';
import DerbySoftLogo from './DerbySoftLogo';
import './Header.scss';

const Header = () => {
  return (
    <Layout.Header className="app-header">
      <DerbySoftLogo />
      <Avatar />
    </Layout.Header>
  );
};

export default Header;
