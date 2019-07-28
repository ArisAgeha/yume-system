<template>
  <div id="app" :style="appStyle">
    <router-view />

    <user-viewer v-if="showUser" :userid="userid" :dialog-visible.sync="showUser" />
    <cg-viewer v-if="showCg" :cgid="cgid" :dialog-visible.sync="showCg" />
    <project-viewer v-if="showProject" :projectid="projectid" :dialog-visible.sync="showProject" />
    <story-viewer v-if="showStory" :storyid="storyid" :dialog-visible.sync="showStory" />
  </div>
</template>
<script>
import { store } from '@/store';

export default {
  name: 'App',
  components: {
    CgViewer: () => import('@/routes/views/CgViewer'),
    UserViewer: () => import('@/routes/views/UserViewer'),
    ProjectViewer: () => import('@/routes/views/ProjectViewer'),
    StoryViewer: () => import('@/routes/views/StoryViewer')
  },
  data() {
    return {
    };
  },
  computed: {
    appStyle() {
      let style = {};
      if (this.blur) style.filter = `blur(${this.blur}px)`;
      return style;
    },
    blur() {
      return store.ui.blurStyle;
    },
    showCg: {
      get() {
        return store.ui.showCg;
      },
      set() {
        store.ui.closeCg();
      }
    },
    cgid() {
      return store.ui.cgid;
    },
    showUser: {
      get() {
        return store.ui.showUser;
      },
      set() {
        store.ui.closeUser();
      }
    },
    userid() {
      return store.ui.userid;
    },
    showProject: {
      get() {
        return store.ui.showProject;
      },
      set() {
        store.ui.closeProject();
      }
    },
    projectid() {
      return store.ui.projectid;
    },
    showStory: {
      get() {
        return store.ui.showStory;
      },
      set() {
        store.ui.closeStory();
      }
    },
    storyid() {
      return store.ui.storyid;
    }
  }
};
</script>

<style lang="scss">
* {
  list-style-type: none;
  box-sizing: border-box;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
html,
body {
  margin: 0;
  color: #666;
}

input,
button,
textarea {
  outline: none;
  &:focus {
    outline: none;
  }
}

html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $font-family;
  font-size: 14px;
  line-height: 1;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #d500ff;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0;
    background: #ffffff;
  }
}

#app {
  min-height: 100vh;
  transition-duration: 0.4s;
}

a {
  text-decoration: none;
}

.mini-scrollbar {
  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #d500ff;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0;
    background: #ffffff;
  }
}

.small-scrollbar {
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #d500ff;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0;
    background: #ffffff;
  }
}

.medium-scrollbar {
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: #d500ff;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0;
    background: #ffffff;
  }
}

.text-ellipsis-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  padding-bottom: 1px;
}

.text-ellipsis-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  padding-bottom: 1px;
}
</style>
