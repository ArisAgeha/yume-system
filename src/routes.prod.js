import Navbar from '@/routes/Navbar';
import * as routes from './routes';

export default [
  {
    path: '/',
    component: Navbar,
    children: Array.prototype.concat.apply([], Object.values(routes).map(item => item.routes))
  },
  {
    path: '*',
    component: {
      beforeRouteEnter(to, from, next) {
        console.info(`找不到页面(${to.fullPath})`);
        next('/');
      }
    }
  }
];
