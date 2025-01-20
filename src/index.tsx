import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, configureStore } from 'simple-redux-store';
import { Icon } from 'react-uni-comps';
import App from './App';
import './scss/index.scss';
import './scss/global.scss';

Icon.loadFromIconfontCN('//at.alicdn.com/t/font_2639743_irllp2uw61.js');

type MenuInfo = {
  funTitle: string;
  funUrl: string;
  childs?: MenuInfo[];
};

type StoreData = {
  color: string;
  menuCollapsed: boolean;
  currentMenu?: MenuInfo; // sec
  unitInfo: {
    name?: string; // 积分名称
    rate?: number; // 一元兑换多少point ,比率
    alarmValue?: number; // 保证金余额警戒值
    currencySymbol?: string; // 货币符号
  };
  orgInfo: {
    name?: string;
    custIcon?: string;
    extra?: {
      staffNum: number;
    };
  };
  nav?: string[]; // 额外的导航信息
  userInfo: { name?: string; custIcon?: string }; //登录用户信息
  acctInfo?: {
    amount?: number;
    consumed?: number;
  };
};

const data: StoreData = {
  color: '#005cff',
  menuCollapsed: false,
  // currentMenu: null,
  unitInfo: {
    name: '积分',
    rate: 100,
  },
  orgInfo: {},
  userInfo: {},
  acctInfo: {},
  nav: [],
};

const store = configureStore(data, true);

createRoot(document.getElementById('app') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
