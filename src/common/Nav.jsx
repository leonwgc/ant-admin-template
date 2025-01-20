import React from 'react';
// import styled from 'styled-components';

import { useLocation, Link } from 'react-router-dom';
import { useAppData } from 'simple-redux-store';
import { Space } from 'antd';
import URI from 'urijs';
import { styled } from 'react-uni-comps';
// import { getSearchParams } from 'src/utils/helper';

const StyledNav = styled.div`
  height: 44px;
  line-height: 44px;
  padding: 0px 20px;
  background: #ffffff;
  border-radius: 0px 8px 0px 0px;
  box-shadow: inset 0px -1px 0px #ebebeb;

  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  color: #8c8c8c;

  .current {
    color: #1a1a1a;
  }
`;

const StyledLink = styled(Link)`
  color: #8c8c8c;
  :hover {
    color: ${(props) => props.theme.color};
  }
`;

const fillMenuArr = (currentMenu, pathname, ar = []) => {
  if (currentMenu) {
    const { childs = [] } = currentMenu;
    for (let m of childs) {
      if (m.funUrl === pathname) {
        ar.push(m);
        break;
      } else if (m.childs) {
        let t = m.childs.find((i) => {
          if (location.search) {
            const s = URI(true);
            return i.funUrl === s.url;
          } else {
            return i.funUrl === pathname;
          }
        });

        if (t) {
          ar.push(m);
          ar.push(t);
        } else {
          fillMenuArr(m, pathname, ar);
        }
      }
    }
  }
};

const Nav = () => {
  const { currentMenu = null, nav = [] } = useAppData();
  const { pathname } = useLocation();

  let ar = [];

  // if (currentMenu) {
  //   const { childs = [] } = currentMenu;
  //   for (let m of childs) {
  //     if (m.funUrl === pathname) {
  //       ar.push(m);
  //       break;
  //     } else if (m.childs) {
  //       let t = m.childs.find((i) => i.funUrl === pathname);

  //       if (t) {
  //         ar.push(m);
  //         ar.push(t);
  //       }
  //     }
  //   }
  // }

  fillMenuArr(currentMenu, pathname, ar);

  if (nav.length) {
    ar = ar.concat(nav);
  }

  const renderNav = (item, idx) => {
    if (idx > 0 && idx < ar.length - 1 && item.funUrl) {
      return (
        <StyledLink to={item.funUrl} key={idx}>
          {item.funTitle}
        </StyledLink>
      );
    }

    return (
      <span key={idx} className={idx === ar.length - 1 ? 'current' : ''}>
        {item.funTitle}
      </span>
    );
  };

  return (
    <StyledNav>
      <Space split="/">{ar.map((item, idx) => renderNav(item, idx))}</Space>
    </StyledNav>
  );
};

export default Nav;
