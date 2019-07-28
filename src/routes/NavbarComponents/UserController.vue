<template>
  <transition name="el-zoom-in-top">
    <div class="user-controller">
      <div class="triangle-wrapper"></div>

      <div class="menu">
        <div class="userinfo">
          <div class="avatar-wrapper">
            <el-image :src="userState.avatar" fit="cover" />
          </div>
          <div class="username">
            {{ userState.nickname }}
          </div>
        </div>

        <el-divider />

        <div class="control-options">
          <div class="control-item" @click="jumpRoute('yume-manager')">
            梦境管理
          </div>
          <div class="control-item" @click="jumpRoute('personal-setting')"> 
            个人设置
          </div>
          <div class="control-item" @click="logout">
            退出登录
          </div>
        </div>
      </div>
    </div>
    
  </transition>
</template>

<script>
import { store } from '@/store';

export default {
  data() {
    return {
    };
  },
  methods: {
    logout() {
      store.authorization.reset();
    },
    jumpRoute(route) {
      this.$router.push(route);
      this.hideMenu();
    },
    hideMenu() {
      this.$emit('hideMenu');
    }
  },
  computed: {
    userState() {
      return store.user.state || {};
    }
  },
  created() {
  }
};
</script>

<style lang='scss' scoped>
$triangleSize: 10px;

.user-controller {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  width: 240px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transition: 0.3s;

  .triangle-wrapper {
    background-color: transparent;
    min-height: $triangleSize;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .triangle-wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    height: 0;
    width: 0;
    border-bottom: $triangleSize solid $navbarColor;
    border-left: $triangleSize solid transparent;
    border-right: $triangleSize solid transparent;
  }
  
  .menu {
    background-color: $navbarColor;
    width: 240px;
    padding: 10px;
    border-radius: 6px;
    color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;

    .userinfo {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;

      .avatar-wrapper {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        margin: 20px 0;

        .el-image {
          width: 60px;
          height: 60px;
        }
      }
    }

    .control-options {
      width: 100%;
      .control-item {
        width: 100%;
        padding: 20px 0;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
      }
      .control-item:first-child {
        margin: 0;
      }
      .control-item:hover {
        background-color: $activeColor;
      }
    }
  }
}
</style>
