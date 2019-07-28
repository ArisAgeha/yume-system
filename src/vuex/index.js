import Vue from 'vue';
import Vuex from 'vuex';
import page from './modules/page';
Vue.use(Vuex);

if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true;
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    page
  }
});
