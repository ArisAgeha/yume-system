import '@/assets/iconfont/iconfont.css';
import Vue from 'vue';
import Element from 'element-ui';

import axios from 'axios';
import VueAxios from 'vue-axios';
import Filter from './plugins/filter';
import App from './App';
import { store } from '@/store';
import { API_URL } from './constant';
import Vuex from './vuex';

if (process.env.NODE_ENV === 'production') {
  Vue.config.productionTip = false;
  Vue.config.silent = true;
  axios.defaults.baseURL = '';
} else {
  Vue.config.productionTip = true;
  Vue.config.performance = true;
  axios.defaults.baseURL = API_URL;
}

// 拦截错误请求
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  err => {
    if (!err.response) {
      return Promise.reject(err);
    }
    err.status = err.response.status || 500;
    const msg = err.response.data ? err.response.data.errmsg : '';
    if (msg) {
      err.message = msg;
    }
    return Promise.reject(err);
  }
);

Vue.use(Filter);
Vue.use(Element);
Vue.use(VueAxios, axios);
/** 注册全局组件 */
// Vue.component('ElDialog', Dialog);

store.authorization.$watch(() => store.authorization.identity, () => autoSetAxios());

export default ({ router }) => {
  installAxios(router);
  autoSetAxios();
  installRouterHook(router);
  router.onReady(() => onReady());
  router.onError(err => onError(err));
  const app = new Vue({
    router,
    store: Vuex,
    render: h => h(App)
  });
  router.onReady(() => app.$mount('#app'));
};

function installAxios(vueRouter) {
  axios.interceptors.response.use(
    response => response,
    err => {
      let reponseURL = err.response ? err.response.request.responseURL : '';
      let baseURL = API_URL;
      if (!baseURL || baseURL === '/') {
        baseURL = location.protocol + '//' + location.host;
      }
      if (reponseURL.indexOf(baseURL) === 0) {
        if (err.status === 403 || err.status === 401) {
          store.session.reset();
        }
      }
      if (err === 'cancel') {
        return Promise.reject(err);
      }
      return Promise.reject(err);
    }
  );
}

function autoSetAxios() {
  const identity = store.authorization.identity;
  Vue.axios.defaults.headers || (Vue.axios.defaults.headers = {});
  const headers = Vue.axios.defaults.headers;
  if (identity) {
    headers['Authorization'] = `Bearer ${identity.token}`;
    if (identity.user_id) {
      headers['x-user-id'] = identity.user_id;
    }
  } else {
    if (headers['Authorization']) {
      delete headers['Authorization'];
    }
    if (headers['x-user-id']) {
      delete headers['x-user-id'];
    }
  }
}

// 装载路由钩子
function installRouterHook(vueRouter) {
  vueRouter.beforeEach((to, from, next) => {
    next();
  });
}

function onReady() {}

function onError(err) {
  console.error(err);
}
