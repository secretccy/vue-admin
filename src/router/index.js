import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    redirect: 'user/userlist',
    component: () => import('../Layout/index.vue'),
    children: [
      {
        path: '/user/userlist',
        name: 'user',
        component: () => import('../views/user/userlist.vue')
      },
      {
        path: '/commodity/commoditylist',
        name: 'commoditylist',
        component: () => import('../views/commodity/commoditylist.vue')
      },
      {
        path: '/report/orderreport',
        name: 'orderrepoet',
        component: () => import('../views/report/orderrepoet.vue')
      },
      {
        path: '/report/consignreport',
        name: 'consignrepoet',
        component: () => import('../views/report/consignrepoet.vue')
      },
      {
        path: '/img/imgupload',
        name: 'imgupload',
        component: () => import('../views/imgs/imgupload.vue')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
