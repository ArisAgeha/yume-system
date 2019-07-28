import { BaseStore } from '@/plugins/BaseStore';
import Component from 'vue-class-component';
// eslint-disable-next-line no-unused-vars
import VueRouter from 'vue-router';
import { MessageBox } from 'element-ui';

@Component
class UI extends BaseStore {
  /**
   * @type {VueRouter}
   */
  title = '';
  blur = '';

  showCg = false;
  cgid = '';

  showUser = false;
  userid = '';

  showProject = false;
  projectid = '';

  showStory = false;
  storyid = '';
  storyList = [];

  viewStack = [];

  get blurStyle() {
    if (this.viewStack.length > 0) return 4;
    else return this.blur;
  }

  get pageTitle() {
    let suffix = 'の蝶梦系统';
    const guestName = this.root.user.state.nickname;
    return `${guestName} - ${suffix}`;
  }

  setBlur(style) {
    this.blur = style;
  }

  setTitle(title) {
    this.title = title;
  }

  async confirm(message, title) {
    try {
      await MessageBox.confirm(message, title);
      return true;
    } catch (err) {
      return false;
    }
  }

  // CG视图
  previewCg(cgid) {
    this.viewStack.push({
      type: 'cg',
      cgid: cgid
    });
    this.cgid = '';
    this.showCg = false;
    setTimeout(() => {
      this.cgid = cgid;
      this.showCg = true;
    }, 0);
  }

  closeCg() {
    this.viewStack.pop();
    this.showCg = false;
    this.cgid = '';
  }

  // 故事视图
  previewStory(storyid) {
    this.viewStack.push({
      type: 'story',
      storyid: storyid
    });
    this.storyid = '';
    this.showStory = false;
    setTimeout(() => {
      this.storyid = storyid;
      this.showStory = true;
    }, 0);
  }

  closeStory() {
    this.viewStack.pop();
    this.showStory = false;
    this.storyid = '';
  }

  setStoryList(list) {
    this.storyList = list;
  }

  // 用户视图
  previewUser(userid) {
    this.viewStack.push({
      type: 'user',
      userid: userid
    });
    this.closeAll();
    setTimeout(() => {
      this.userid = userid;
      this.showUser = true;
    }, 0);
  }

  closeUser() {
    this.showUser = false;
    this.userid = '';
    this.viewStack.pop();
    this.checkViewStack();
  }

  // 企划视图
  previewProject(projectid) {
    this.viewStack.push({
      type: 'project',
      projectid: projectid
    });
    this.closeAll();
    setTimeout(() => {
      this.projectid = projectid;
      this.showProject = true;
    }, 0);
  }

  closeProject() {
    this.showProject = false;
    this.projectid = '';
    this.viewStack.pop();
    this.checkViewStack();
  }

  // 检查视图栈
  checkViewStack() {
    if (this.viewStack.length !== 0) {
      let viewData = this.viewStack[this.viewStack.length - 1];
      switch(viewData.type) {
        case 'cg':
          setTimeout(() => {
            this.cgid = viewData.cgid;
            this.showCg = true;
          }, 0);
          break;
        case 'story':
          setTimeout(() => {
            this.storyid = viewData.storyid;
            this.showStory = true;
          }, 0);
          break;
        case 'user':
          setTimeout(() => {
            this.userid = viewData.userid;
            this.showUser = true;
          }, 0);
          break;
        case 'project':
          setTimeout(() => {
            this.projectid = viewData.projectid;
            this.showProject = true;
          }, 0);
          break;
      }
    }
  }

  closeAll() {
    this.showCg = false;
    this.showUser = false;
    this.showStory = false;
    this.showProject = false;
    this.cgid = '';
    this.userid = '';
    this.projectid = '';
    this.storyid = '';
  }

  clearViewStack() {
    this.viewStack = [];
  }
}

export default UI;
