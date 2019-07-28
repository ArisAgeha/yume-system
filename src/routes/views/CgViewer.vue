<template>
  <div class="cg-viewer">
    <el-dialog
      :visible.sync="show"
      :fullscreen="true"
      :show-close="false"
      :close-on-press-escape="false"
      :append-to-body="true">

      <div class="cg-viewer-wrapper" @click="closeModal">

        <transition name="el-fade-in">
          <div class="cg-viewer-body" v-if="cgData" v-show="!fs" @click.stop>

            <div class="horizon-view" v-if="horizon">
              <div class="cg-wrapper" @click="fsPreview">
                <el-image :src="cgData.cg" />
                <div class="shade"></div>
              </div>
              <div class="more-info">
                <div class="left">
                  <div class="title">
                    用户信息
                  </div>
                  <div class="content" @click="showUser">
                    <div class="avatar">
                      <el-image fit="cover" :src="cgData.author.avatar" />
                    </div>
                    <div class="nickname">{{ cgData.author.nickname }}</div>
                  </div>
                </div>
                <div class="right" v-if="cgData.tags.length > 0">
                  <div class="title">
                    作品标签
                  </div>
                  <div class="content">
                    <el-tag size="mini" color="#fff" v-for="tag in cgData.tags" :key="tag">{{ tag }}</el-tag>
                  </div>
                </div>
              </div>
            </div>

            <div class="vertical-view" v-else @click.stop>
              <div class="more-info">
                <div class="top" @click="showUser">
                  <div class="avatar">
                    <el-image fit="cover" :src="cgData.author.avatar" />
                  </div>
                  <div class="nickname">{{ cgData.author.nickname }}</div>
                </div>
                <div class="bottom" v-if="cgData.tags.length > 0">
                  <div class="title">
                    作品标签
                  </div>
                  <div class="content">
                    <el-tag size="mini" color="#fff" v-for="tag in cgData.tags" :key="tag">{{ tag }}</el-tag>
                  </div>
                </div>
              </div>
              <div class="cg-wrapper" @click="fsPreview">
                <el-image :src="cgData.cg" />
                <div class="shade"></div>
              </div>
            </div>
          </div>
        </transition>

        <transition name="el-fade-in">
          <div class="fs-viewer" v-show="fs" @click.stop="closeFs">
            <el-image :src="cgData.cg" v-if="cgData" />
          </div>
        </transition>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { store } from '@/store';
import services from '@/services';

export default {
  components: {
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    cgid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      cgData: null,
      horizon: true,
      fs: false
    };
  },
  methods: {
    showUser() {
      store.ui.previewUser(this.cgData.author.user_id);
    },
    closeFs() {
      this.fs = false;
    },
    fsPreview() {
      this.fs = true;
    },
    closeModal() {
      if (!this.fs) store.ui.closeCg();
      else this.fs = false;
    },
    async initData() {
      let cgId = this.cgid;
      if (!cgId) {
        this.$message.error('无法查看该CG');
        return;
      }
      try {
        this.cgData = await services.album.getCgDetail(cgId);
        let img = new Image();
        img.onload = () => {
          if (img.width > img.height) this.horizon = true;
          else this.horizon = false;
        };
        img.src = this.cgData.cg;
      }
      catch(err) {
        this.$message.error(err.message);
        console.error(err);
      }
    }
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
.cg-viewer-wrapper {
  width: 100%;
  padding-top: 7vh;
  padding-bottom: 50px;
  position: relative;
  transition: 0.3s;
  user-select: none;
}

.cg-viewer-body {
  background-color: #fff;
  width: 850px;
  border-radius: 4px;
  overflow: hidden;
  margin: auto;
  transition: 0.3s;

  .horizon-view {
    width: 850px;
    margin: 0;

    .cg-wrapper {
      position: relative;
      cursor: pointer;

      .shade {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: .5s;
      }

      .shade:hover {
        background: hsla(0,0%,100%,.2);
      }
    }

    .more-info {
      display: flex;
      justify-content: space-between;
      padding: 20px 50px;

      .left {
        height: 100%;
        width: 70%;
        .title {
          margin-bottom: 10px;
        }
        .content {
          display: flex;
          align-items: center;
          cursor: pointer;

          .avatar {
            height: 50px;
            width: 50px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 20px;

            .el-image {
              height: 50px;
              width: 50px;
            }
          }
        }
      }

      .right {
        height: 100%;
        width: 30%;
        .title {
          margin-bottom: 10px;
        }
        .content {
          .el-tag {
            margin-right: 10px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }

  .vertical-view {
    display: flex;
    .cg-wrapper {
      font-size: 0;
      position: relative;
      cursor: pointer;

      .shade {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: .5s;
      }

      .shade:hover {
        background: hsla(0,0%,100%,.2);
      }
    }
    .more-info {
      width: 300px;
      margin: 20px;
      display: flex;
      flex-direction: column;
      .top {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 100px;
        cursor: pointer;

        .avatar {
          height: 80px;
          width: 80px;
          border-radius: 50%;
          overflow: hidden;
          margin: 20px 0;

          .el-image {
            height: 100%;
            width: 100%;
          }
        }

        .nickname {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
          text-align: center;
        }
      }

      .bottom {
        .title {
          margin-bottom: 10px;
        }

        .content {
          .el-tag {
            margin-right: 10px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}

.fs-viewer {
  position: absolute;
  top: 7vh;
  left: 0;
  right: 0;
  padding-bottom: 50px;
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
