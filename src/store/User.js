import { BaseStore } from '@/plugins/BaseStore';
import Component from 'vue-class-component';

@Component
class Session extends BaseStore {
  state = null;
  fetching = null;

  async fetch() {
    if (this.fetching) {
      return;
    }
    this.fetching = true;
    this.error = null;
    try {
      this.state = await this.services.user.getData();
    }
    catch(err) {
      this.logger.error(err);
      this.error = err;
    }
    finally {
      this.fetching = false;
    }
  }

  get userData() {
    return this.state;
  }

  clear() {
    this.state = null;
  }
}

export default Session;
