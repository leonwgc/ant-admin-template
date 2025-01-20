const menus = [
  {
    funTitle: '平台产品',
    childs: [
      {
        funTitle: '企业',
        funUrl: '/qy',
        childs: [
          {
            funTitle: '通讯录',
            funLogo: 'icon-jifenfafang',
            childs: [
              {
                funTitle: '人员通讯录',
                funUrl: `/qy/txl/people`,
              },
              {
                funTitle: '部门管理',
                funUrl: `/qy/txl/org`,
              },
              {
                funTitle: '员工标签管理',
                funUrl: `/qy/txl/tag`,
              },
              {
                funTitle: '已离职员工',
                funUrl: `/qy/txl/people/lz`,
                hide: true, // 不显示在菜单
              },
              {
                funTitle: '批量导入/修改',
                funUrl: `/qy/txl/people/batch`,
                hide: true, // 不显示在菜单
              },
              {
                funTitle: '部门管理 / 批量导入',
                funUrl: `/qy/txl/org/batch`,
                hide: true, // 不显示在菜单
              },
            ],
          },
          {
            funTitle: '积分管理',
            funLogo: 'icon-jifenfafang',
            childs: [
              {
                funTitle: '企业账户总览',
                funUrl: `/qy/jf/overview`,
              },
              {
                funTitle: '员工积分查询',
                funUrl: `/qy/jf/list`,
              },
              {
                funTitle: '员工积分发放',
                funUrl: `/qy/jf/send-list`,
              },
              {
                funTitle: '发放批次详情',
                funUrl: `/qy/jf/pcxq`,
                hide: true, // 不显示在菜单
              },
              {
                funTitle: '批量回收',
                funUrl: `/qy/jf/recycle`,
                hide: true, // 不显示在菜单
              },
              {
                funTitle: '积分发放',
                funUrl: `/qy/jf/send`,
                hide: true, // 不显示在菜单
              },
              {
                funTitle: '老三合一积分发放',
                funUrl: 'https://t-one.zuifuli.com/hr/point/pointProvide',
              },
              {
                funTitle: '三合一福利管理',
                funUrl: 'https://t-one.zuifuli.com/web/form/fl.html#/seckill',
              },
            ],
          },
          {
            funTitle: '企业设置',
            funLogo: 'icon-jifenfafang',
            childs: [
              {
                funTitle: '企业信息',
                funUrl: `/qy/sz/info`,
              },
              {
                funTitle: '职场地址',
                funUrl: `/qy/sz/address`,
              },
              {
                funTitle: '通用设置',
                funUrl: `/qy/sz/common`,
              },
            ],
          },
        ],
      },
      {
        funTitle: '福利',
        funUrl: '/fuli',
        childs: [
          {
            funTitle: '福利后台',
            funLogo: 'icon-qiyexinxi',
            childs: [
              {
                funTitle: '福利运营位配置',
                funUrl: `https://t-one.zuifuli.com/web/form/fl.html#/bannerOperation`,
              },
              {
                funTitle: '福利场景配置',
                funUrl: `https://t-one.zuifuli.com/web/form/fl.html#/sceneOperation`,
              },
              {
                funTitle: '秒杀配置',
                funUrl: `https://t-one.zuifuli.com/web/form/fl.html#/seckill`,
              },
              {
                funTitle: '信息流运营位配置',
                funUrl: `https://t-one.zuifuli.com/web/form/fl.html#/feedOperation`,
              },
              {
                funTitle: '信息流商品后台配置',
                funUrl: `https://t-one.zuifuli.com/web/form/fl.html#/feedGoods`,
              },
            ],
          },
          {
            funTitle: '积分发放',
            funLogo: 'icon-jifenfafang',
            childs: [
              {
                funTitle: '批量发放',
                funUrl: `/fuli/point-send`,
              },
              {
                funTitle: '发放记录',
                funUrl: '/fuli/point-record-list',
              },
            ],
          },
          {
            funTitle: '员工账户',
            funLogo: 'icon-yuangongzhanghu',
            childs: [
              {
                funTitle: '余额查询',
                funUrl: `/fuli/balance-list`,
              },
              {
                funTitle: '消费报表',
                funUrl: '/fuli/consuming-list',
              },
            ],
          },
          {
            funTitle: '消费兑换配置',
            funLogo: 'icon-xiaofeichangjing',
            funUrl: '/fuli/consuming-setting',
          },
          {
            funTitle: '企业账户',
            funLogo: 'icon-qiyexinxi',
            childs: [
              {
                funTitle: '账户管理',
                funUrl: `/fuli/account-manage`,
              },
              {
                funTitle: '账户消费',
                funUrl: `/fuli/account-consuming`,
              },
            ],
          },
        ],
      },
      {
        funTitle: '文化',
        funUrl: '/wh',
        childs: [
          {
            funTitle: '文化社区管理',
            childs: [
              {
                funTitle: '内容审核',
                funUrl: `https://t-one.zuifuli.com/web/forms/wh.html#/community/approvelist`,
              },
              {
                funTitle: '社区管理',
                funUrl: 'https://t-one.zuifuli.com/web/forms/wh.html#/community/manage',
              },
            ],
          },
        ],
      },
      {
        funTitle: '设置',
        funUrl: '/setting',
        childs: [
          {
            funTitle: '管理员',
            funLogo: 'icon-guanliyuan',
            funUrl: '/setting/admin',
          },
          {
            funTitle: '通讯录',
            funLogo: 'icon-tongxunlu',
            funUrl: '/setting/contact',
          },
        ],
      },
    ],
  },
];

export default menus;
