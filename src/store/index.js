import Vue from 'vue';
import Component from 'vue-class-component';

/** components */
import UI from './UI';
import Authorization from './Authorization';
import User from './User';

@Component
class RootStore extends Vue {
  ui = new UI({ parent: this });
  authorization = new Authorization({ parent: this });
  user = new User({ parent: this });
}

export { RootStore };

export const store = new RootStore();
