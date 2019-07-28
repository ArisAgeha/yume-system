import services from '@/services';
// eslint-disable-next-line
import { RootStore } from '@/store';
import Vue from 'vue';

export class BaseStore extends Vue {
  services = services;

  /** @type {RootStore} */
  get root() {
    return this.$root;
  }
}
