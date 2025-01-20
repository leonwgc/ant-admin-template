import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useUpdateStore, useAppData } from 'simple-redux-store';
import { getFlatMenus } from '../Menus';
// import * as service from '../service';
// import { getSearchParams } from 'src/utils/helper';
// import { logout } from 'src/utils/helper';
import hideHeaderRoutesCfg from './hideHeaderRoutesCfg';
import './Header.less';
import URI from 'urijs';
import menuData from '../menuDataNew';
const pathWithoutMenus = ['/login', '/forget'];

const outsidePathes = ['/login', '/forget', '/index', '/info'];

// const StyledSimpleHead = styled.div`
//   position: absolute;
//   color: #fff;
//   right: 24px;
//   height: 60px;
//   display: flex;
//   align-items: center;
// `;

// const StyledHeaderWrapper = styled.div`
//   position: relative;
//   min-width: 1024px;
//   ${getThemeColorCss('background')}
// `;

// const StyledLogo = styled.div`
//   width: 120px;
//   height: 60px;
//   margin: 0 20px;
//   position: absolute;
//   top: 0;
//   background-image: ${({
//     custIcon = '//static.zuifuli.com/assets/icare-company/head-logo.png',
//   }) => `url(${custIcon})`};
//   background-size: 100%;
//   background-repeat: no-repeat;
//   background-position: center;
// `;

const getGranpaMenu = (menus = [], pathname) => {
  let funUrl = pathname;
  if (pathname === '/one') {
    const { search = '' } = location;

    if (search.indexOf('?') === 0) {
      const searchObj = URI(true);
      const { url = '' } = searchObj;
      funUrl = url;
    }
  }
  for (let m of menus) {
    let fms = getFlatMenus([m]);
    if (fms.find((i) => i.funUrl === funUrl)) {
      return m;
    }
  }
};

// get first item which has funUrl in sec menus
const getFirstMenu = (secMenus = []) => {
  for (let c of secMenus) {
    if (c.funUrl) {
      return c;
    } else if (c.childs) {
      for (let c1 of c.childs) {
        if (c1.funUrl) {
          return c1;
        }
      }
    }
  }
  return null;
};

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { orgInfo = {}, userInfo = {}, env = 'web' } = useAppData();
  const updateStore = useUpdateStore();
  const [loading, setLoading] = useState(false);

  const gotoFirstMenu = useCallback(
    (menuData) => {
      if (
        hideHeaderRoutesCfg.includes(history.location.pathname) ||
        outsidePathes.includes(history.location.pathname)
      ) {
        return;
      }
      const topMenu = menuData;
      const firstMenu = getFirstMenu(topMenu.childs);
      if (firstMenu) {
        updateStore({ currentMenu: firstMenu });
        history.push(firstMenu.funUrl);
      }
    },
    [history, updateStore]
  );

  useEffect(() => {
    if (pathWithoutMenus.includes(pathname)) return;
    setLoading(true);

    const menu = getGranpaMenu(menuData.childs, pathname);
    updateStore({ currentMenu: menuData });
    // match failed & fallback
    if (!menu) {
      gotoFirstMenu(menuData);
    }

    // service
    //   .getMenus()
    //   .then((menuData) => {
    //     // match path

    //     setLoading(false);
    //   })
    //   .catch(() => setLoading(false));
  }, []);

  const renderUserAvatar = () => {
    const style = {
      fontSize: 20,
      color: '#fff',
      borderRadius: '50%',
      margin: '0 10px 0 20px',
      width: 20,
      height: 20,
    };

    return (
      <img
        src={
          userInfo.custIcon ||
          '//static.zuifuli.com/assets/icare-company/avatar.png'
        }
        alt="avatar"
        style={style}
      />
    );
  };

  const isSimpleMode = pathname === '/tip';
  const hideHeader = hideHeaderRoutesCfg.includes(pathname);

  return !hideHeader ? (
    <div className="top-header">
      <div className="logo" />
      {isSimpleMode ? (
        <div className="simple-header">
          {renderUserAvatar()}
          <span className="text">{userInfo.name}</span>
        </div>
      ) : (
        <header>
          <div style={{ display: 'flex', alignItems: 'center' }}></div>

          <div className="right-side">
            {/* <NavLink to="/company" activeClassName="active" className={`menu-item`}>
              企业信息
            </NavLink>
            <div className="line"></div> */}
            <div style={{ marginRight: 40 }}>
              {renderUserAvatar()}
              <span>{userInfo.name}</span>
            </div>
            {userInfo.subChannel !== 'feishu' && (
              <div
                className="text logout"
                // onClick={() =>
                //   service.logout().then(() => {
                //     logout(env);
                //   })
                // }
              >
                退出
              </div>
            )}
          </div>
        </header>
      )}
    </div>
  ) : null;
};

export default Header;
