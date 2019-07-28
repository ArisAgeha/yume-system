export const homeRoutes = {
  name: 'home',
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home-team" */ '@/routes/HomePage'),
      meta: {
        title: '首页',
        authName: 'home'
      }
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "auth-team" */ '@/routes/AuthComponents/Login'),
      meta: {
        title: '登录',
        authName: 'home'
      }
    },
    {
      path: '/signup',
      component: () => import(/* webpackChunkName: "auth-team" */ '@/routes/AuthComponents/Signup'),
      meta: {
        title: '注册',
        authName: 'home'
      }
    }
  ]
};
