import React from 'react';

import HomeOnePage from './HomeOnePage';
import Collections from './Collections';

const routes = [
  { path: '/', component: <HomeOnePage />},
  { path: '/collections', component: <Collections />},
]

export default routes;