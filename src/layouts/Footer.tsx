import { Animated } from '~/components/Animated';
import './Footer.scss';

const Footer = ({ menuCollapsed }) => {
  return (
    <div className="app-footer">
      {menuCollapsed ? (
        <div className="symbol" style={{ fontSize: 20 }}>
          ©
        </div>
      ) : (
        <Animated type="fade">
          <div>
            <div>© 2002 - feature</div>
            <div>All rights reserved.</div>
          </div>
        </Animated>
      )}
    </div>
  );
};

export default Footer;
