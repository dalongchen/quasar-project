import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/stockk/:id/code2/:code2/name2/:name2',
    component: () => import('layouts/MainLayoutSt.vue'),
    children: [{ path: '', component: () => import('src/pages/PageStockk2.vue') }],
  },
  {
    path: '/tab',
    component: () => import('layouts/MainLayoutSt.vue'),
    children: [{ path: '', component: () => import('pages/IndexTable.vue') }],
  },
  {
    path: '/polls/5/vote/',
    component: () => import('layouts/MainLayoutSt.vue'),
    children: [{ path: '', component: () => import('pages/PageVote.vue') }],
  },
  {
    path: '/mytest',
    component: () => import('layouts/MainLayoutSt.vue'),
    children: [{ path: '', component: () => import('pages/IndexTableMyTest.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
