import { lazy } from 'react';

const Empty = () => {
  return <div></div>;
};

const routes = [
  {
    path: `/qy/txl/people`,
    exact: true,
    component: Empty,
  },
  {
    path: `/qy/txl/people/lz`,
    component: Empty,
  },
  {
    path: `/qy/txl/people/batch`,
    exact: true,
    component: Empty,
  },
  {
    path: `/qy/txl/org`,
    exact: true,
    component: Empty,
  },
  {
    path: `/qy/txl/org/batch`,
    component: Empty,
  },
  {
    path: `/qy/txl/tag`,
    component: Empty,
  },
];

export default routes;
