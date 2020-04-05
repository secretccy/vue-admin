import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/home',
    redirect: 'user/userlist',
    component: () => import('../Layout/index.vue'),
    children: [
      {
        path: '/user/userlist',
        component: () => import('../views/user/userlist.vue'),
      },
      {
        path: '/commodity/commoditylist',
        component: () => import('../views/commodity/commoditylist.vue'),
      },
      {
        path: '/commodity/commodityinfo',
        component: () => import('../views/commodity/commodityinfo.vue'),
      },
      {
        path: '/report/orderreport',
        component: () => import('../views/report/orderrepoet.vue'),
      },
      {
        path: '/report/consignreport',
        component: () => import('../views/report/consignrepoet.vue'),
      },
      {
        path: '/img/imgupload',
        component: () => import('../views/imgs/imgupload.vue'),
      },
      {
        path: '/certificate/certificatelist',
        component: () => import('../views/certificate/certificatelist.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
