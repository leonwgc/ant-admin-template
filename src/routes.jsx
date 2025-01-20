// import { lazy } from 'react';

import Layout from './Layout';

// global routes

const routes = [
  // {
  //   path: `/login`,
  //   component: lazy(() => import('./v2/Login')),
  // },
  // {
  //   path: `/forget`,
  //   component: lazy(() => import('./v2/Forget')),
  // },

  // {
  //   path: `/one`,
  //   component: lazy(() => import('./One')),
  // },

  {
    path: `/`,
    component: Layout,
  },
];

export default routes;
