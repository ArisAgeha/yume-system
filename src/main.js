import './assets/styles/theme-custom.scss';
import Vue from 'vue';
import Router from 'vue-router';
import install from './install';
import { store } from '@/store';
import { sync } from 'vuex-router-sync';
import Vuex from './vuex';
import routes from './routes.prod';

async function bootstrap() {
  Vue.use(Router);

  (async () => {
    await store.authorization.loadIdentity();
    if (!store.authorization.isAuthorized) {
      store.authorization.reset();
    }
    const router = new Router({ routes });
    sync(Vuex, router);
    install({ router });
  })();
}

bootstrap();
