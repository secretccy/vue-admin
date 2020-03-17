import { bus } from '@/utils/Bus.js';
import router from './index';
const whiteRouter = ['/login'];
router.beforeEach((to, from, next) => {
  if (bus.get('token')) {
    next();
  } else if (whiteRouter.indexOf(to.path) !== -1) {
    next();
  } else {
    next('/login');
  }
});
