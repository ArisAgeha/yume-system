<template>
  <div class="user-viewer">
    <el-dialog
      :visible.sync="show"
      :fullscreen="true"
      :show-close="false"
      :close-on-press-escape="false"
      :append-to-body="true">

      <div class="user-viewer-wrapper medium-scrollbar" @click="closeModal" @scroll="onscroll">
        <transition name="el-fade-in">
          <div class="user-viewer-body" v-if="userData" v-show="!fs" @click.stop ref="viewBody">
            <div class="left-mask"></div>
            <div class="left" :style="{ top: scrollTop }">
              <div class="user-info">
                <div class="avatar">
                  <el-image fit="cover" :src="userData.avatar" />
                </div>
                <div class="nickname">{{ userData.nickname }}</div>
                <div class="user-count">
                  <div class="fans-count">
                    <span>粉丝数</span>
                    <span class="num">{{ userData.fans_num }}</span>
                  </div>
                  <el-divider direction="vertical" />
                  <div class="publish-count">
                    <span>作品数</span>
                    <span class="num">{{ userData.publish_num }}</span>
                  </div>
                </div>
                <div class="sign" v-if="userData.sign">{{ userData.sign }}</div>
                <div class="concern-button">
                  <el-button type="primary">关注</el-button>
                </div>
              </div>

              <el-divider />
            </div>

            <div class="right">
              <div class="top">
                <div class="cover">
                  <el-image fit="cover" :src="userData.cover" />
                </div>
                <div class="tabs">
                  <div 
                    class="tab"
                    @click="active = tab.key"
                    :class="{ active: tab.key === active }" 
                    v-for="tab in tabs" 
                    :key="tab.key">{{ tab.name }}
                  </div>
                </div>
              </div>
              <div class="bottom">
                <transition-group name="el-fade-in">
                  <project :user-id="userData.user_id" v-show="active === 'project'" key="project" ref="project" />
                  <cg :user-id="userData.user_id" v-show="active === 'cg'" key="cg" ref="cg" />
                  <story :user-id="userData.user_id" v-show="active === 'story'" key="story" ref="story" />
                </transition-group>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { store } from '@/store';
import services from '@/services';
import Project from './components/Project';
import Cg from './components/Cg';
import Story from './components/Story';

export default {
  components: {
    Project,
    Cg,
    Story
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    userid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      scrollTop: '0px',
      userData: null,
      fs: false,
      tabs: [
        {
          key: 'project',
          name: '企划'
        },
        {
          key: 'cg',
          name: '画集'
        },
        {
          key: 'story',
          name: '故事'
        }
      ],
      active: 'project'
    };
  },
  methods: {
    onscroll(e) {
      let el = e.target;
      this.scrollTop = `${el.scrollTop}px`;
      if (el.scrollHeight - el.scrollTop < el.offsetHeight + 50) {
        if (this.active === 'project') {
          this.$refs.project.fetchMoreProject();
        }
        else if (this.active === 'cg') {
        }
        else if (this.active === 'story') {
          this.$refs.story.fetchMoreStory();
        }
      }
    },
    closeFs() {
      this.fs = false;
    },
    fsPreview() {
      this.fs = true;
    },
    closeModal() {
      if (!this.fs) store.ui.closeUser();
      else this.fs = false;
    },
    async initData() {
      let userId = this.userid;
      if (!userId) {
        this.$message.error('无法查看该用户');
        return;
      }
      try {
        this.userData = await services.user.getUserDetail(userId);
      }
      catch(err) {
        this.$message.error(err.message);
        console.error(err);
      }
    }
  },
  watch: {
  },
  computed: {
    show: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit('update:dialogVisible', val);
      }
    }
  },
  beforeDestroy() {
  },
  beforeCreate() {
  },
  created() {
    this.initData();
  }
};
</script>

<style lang='scss' scoped>
.user-viewer-wrapper {
  width: 100%;
  padding-top: 7vh;
  padding-bottom: 50px;
  position: relative;
  transition: 0.3s;
  user-select: none;
  height: 100%;
  overflow: auto;
}

.user-viewer-body {
  width: 1160px;
  border-radius: 4px;
  margin: auto;
  transition: 0.3s;
  display: flex;
  position: relative;

  .left-mask {
    min-width: 320px;
    max-width: 320px;
  }

  .left {
    position: absolute;
    left: 0;
    top: 0;

    padding: 30px;
    border-radius: 4px;
    min-width: 320px;
    max-width: 320px;
    background-color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 1px 3px rgba(0,0,0,.08);

    .user-info {
      width: 100%;
      .avatar {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        margin: auto;
        .el-image {
          width: 100%;
          height: 100%;
        }
      }

      .nickname {
        margin: 20px 0 10px;
        font-size: 24px;
        text-align: center;
        font-weight: bold;
      }

      .user-count {
        display: flex;
        justify-content: space-around;
        margin-top: 30px;

        .el-divider {
          height: 50px;
        }

        .fans-count,
        .publish-count {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 20px;
          .num {
            margin-top: 10px;
            font-size: 18px;
          }
        }
      }

      .sign {
        margin-top: 20px;
        text-align: center;
        line-height: 1.4;
      }

      .concern-button {
        margin-top: 30px;
        .el-button {
          width: 100%;
        }
      }
    }
  }

  .right {
    margin-left: 20px;
    width: 820px;

    .top {
      background-color: #fff;
      border-radius: 4px;
      height: 200px;
      margin-bottom: 10px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);

      .cover {
        height: 150px;
        width: 100%;

        .el-image {
          width: 100%;
          height: 150px;
        }
      }

      .tabs {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .tab {
          width: 20%;
          text-align: center;
          height: 100%;
          line-height: 50px;
          cursor: pointer;
        }

        .tab.active {
          border-bottom: 3px solid $primaryColor;
        }
      }
    }

    .bottom {
      width: 100%;
    }
  }
}

.fs-viewer {
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;
  .el-image {
    max-width: 1200px;
    min-width: 300px;
  }
}
</style>
