import FadeIn from '~/components/FadeIn';
import './Footer.scss';

const Footer = ({ menuCollapsed }) => {
  return (
    <div className="app-footer">
      {menuCollapsed ? (
        <div className="symbol" style={{ fontSize: 20 }}>
          ©
        </div>
      ) : (
        <FadeIn duration={300}>
          <div>© 2002 - feature</div>
          <div>All rights reserved. </div>
        </FadeIn>
      )}
    </div>
  );
};

export default Footer;
