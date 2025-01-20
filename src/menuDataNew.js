const menuData = {
  funTitle: '特斯拉',
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
          funTitle: '三合一积分发放',
          funUrl: 'https://t-one.zuifuli.com/hr/point/pointProvide',
        },
        {
          funTitle: '三合一福利管理',
          funUrl: 'https://t-one.zuifuli.com/web/form/fl.html#/seckill',
        },
      ],
    },
  ],
};

export default menuData;
