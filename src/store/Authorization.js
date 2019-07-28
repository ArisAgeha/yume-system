import { BaseStore } from '@/plugins/BaseStore';
import Component from 'vue-class-component';

@Component
class Authorization extends BaseStore {
  token = '';
  userId = '';
  shouldUpdate = false;
  prefix = 'YUME-MATORYOUSHIKA-SYSTEM';

  get identity() {
    if (this.token && this.userId) {
      const data = {
        token: this.token,
        userId: this.userId
      };
      return data;
    } else {
      return null;
    }
  }

  get isAuthorized() {
    return !!this.token && !!this.userId;
  }

  // 读取身份，若有，从services获取user信息
  async loadIdentity() {
    try {
      await this.readLocalStorage();
      if (this.isAuthorized) {
        const fetchs = [
          this.root.user.fetch(),
        ];
        await Promise.all(fetchs);

        if (!this.root.user.state) {
          this.reset();
        }
      }
    } catch (err) {
      this.reset();
    }
  }

  // 从localStorage里读取user信息
  readLocalStorage() {
    const prefix = this.prefix;
    const data = {
      token: localStorage.getItem(`${prefix}_auth.token`) || '',
      userId: localStorage.getItem(`${prefix}_auth.userId`) || '',
    };
    if (data.token && data.userId) {
      this.token = data.token;
      this.userId = data.userId;
    }
  }

  // 登录
  async authForUser(auth) {
    this.auth(auth);
    await this.loadIdentity();
    if (this.isAuthorized) {
    } else {
      throw new Error('登录失败');
    }
  }

  // 将token和userId设置到localStorage
  auth(auth) {
    if (auth.user_id && auth.token) {
      this.reset();
      const prefix = this.prefix;
      localStorage.setItem(`${prefix}_auth.token`, auth.token);
      localStorage.setItem(`${prefix}_auth.userId`, auth.user_id);
    }
  }

  // 清空登录信息
  reset() {
    this.token = '';
    this.userId = '';
    const prefix = this.prefix;
    localStorage.removeItem(`${prefix}_auth.token`);
    localStorage.removeItem(`${prefix}_auth.userId`);
    this.root.user.clear();
  }

  setShouldUpdate(shouldUpdate) {
    this.shouldUpdate = shouldUpdate;
  }

}

export default Authorization;
