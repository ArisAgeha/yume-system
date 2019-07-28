<template>
  <div class="navbar-wrapper">
    <div class="navbar-holder"></div>
    <div class="navbar-blur"></div>

    <div class="navbar">
      <div class="left">
        <div class="logo" @click="$router.push('/')">
          <div class="avatar">
            <img v-if="logo" src="logo" alt="">
          </div>
          <h2>梦蝶系统</h2>
        </div>
        <div class="route-wrapper">
          <div
            class="route-button"
            @click="jumpRouter(route.route)" 
            v-for="(route, index) in menuRoute" 
            :key="index">
            {{ route.name }}
          </div>
        </div>
      </div>

      <div class="right-logout" v-if="!isLogin">
        <div>
          <div @click="login" class="user-control-button">登录</div>
        </div>
        <div>
          <el-button @click="signup" size="small" type="primary">注册</el-button>
        </div>
      </div>

      <div class="right-userinfo" v-else>
        <span class="nickname">
          {{ userState.nickname }}
        </span>
        <div class="userinfo-button-wrapper" @mouseenter="showCtl" @mouseleave="showUserController = false">
          <div class="avatar-wrapper">
            <el-image fit="cover" :src="userState.avatar" alt="" />
          </div>

          <user-controller @hideMenu="showUserController = false" v-if="loadUserController" v-show="showUserController" />
        </div>
        <div class="contribute-wrapper">
          <div class="contribute-holder"></div>
          <div class="contribute-button" @mouseenter="showAl" @mouseleave="showAddList = false">
            <div class="contribute-text">
              渐入梦境
            </div>
            <contributor @hideMenu="showAddList = false" v-if="loadAddList" v-show="showAddList" />
          </div>
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import { store } from '@/store';

export default {
  components: {
    UserController: () => import('./NavbarComponents/UserController'),
    Contributor: () => import('./NavbarComponents/Contributor')
  },
  data() {
    return {
      logo: null,
      showAddList: false,
      loadAddList: false,
      loadUserController: false,
      showUserController: false,
      menuRoute: [
        {
          name: '企划',
          route: '/project'
        },
        {
          name: '画集',
          route: '/album'
        }
      ]
    };
  },
  methods: {
    showCtl() {
      this.loadUserController = true;
      this.showUserController = true;
    },
    showAl() {
      this.loadAddList = true;
      this.showAddList = true;
    },
    signup() {
      this.$router.push('/signup');
    },
    login() {
      this.$router.push('/login');
    },
    jumpRouter(route) {
      this.$router.push(route);
    }
  },
  computed: {
    userState() {
      return store.user.state || {};
    },
    isLogin() {
      return store.authorization.isAuthorized;
    }
  },
  created() {
  }
};
</script>

<style lang='scss' scoped>
* {
  box-sizing: border-box;
}

.navbar-wrapper {
  position: relative;
  width: 100%;
  min-width: 1024px;
  .navbar-holder {
    height: $navbarHeight;
  }
  .navbar-blur {
    height: $navbarHeight;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    filter: blur(4px);
    z-index: 100;
  }
  .navbar {
    height: $navbarHeight;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $navbarColor;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    padding-left: 20px;
    user-select: none;
    z-index: 100;

    .left,
    .right {
      display: flex;
      align-items: center;
    }

    .left {
      height: 100%;
      .logo {
        display: flex;
        align-items: center;
        color: #fff;

        .avatar {
          width: 35px;
          height: 35px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            min-width: 100%;
            min-height: 100%;
          }
        }
      }
      .route-wrapper {
        display: flex;
        align-items: center;
        margin: 0 20px;
        height: 100%;
        .route-button {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: #fff;
          padding: 10px;
          cursor: pointer;
          transition: 0.3s;
        }

        .route-button:hover {
          background-color: $activeColor;
        }
      }
    }

    .right-logout { display: flex;
      align-items: center;
      margin-right: 20px;

      .user-control-button {
        color: #fff;
        padding-right: 20px;
        cursor: pointer;
      }
    }

    .right-userinfo {
      display: flex;
      align-items: center;
      height: 100%;

      .userinfo-button-wrapper {
        height: 100%;
        padding: 0 10px;
        display: flex;
        align-items: center;
        transition-duration: 0.3s;
        margin-right: 20px;
        position: relative;

        .avatar-wrapper {
          height: 35px;
          width: 35px;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;

          .el-image {
            width: 100%;
            height: 100%;
          }
        }
      }

      .userinfo-button-wrapper:hover {
        background-color: $activeColor;
      }

      .nickname {
        color: #fff;
        margin-right: 20px;
      }

      .contribute-wrapper {
        height: 100%;
        position: relative;

        .contribute-holder {
          width: 92px;
        }
        .contribute-button {
          position: absolute;
          right: 0;
          top: -1px;
          bottom: -4px;
          background-color: $primaryColor;
          color: #fff;
          width: 92px;
          border-radius: 0 0 6px 6px;
          transition: 0.3s;

          .contribute-text {
            height: 52px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }

        .contribute-button:hover {
          bottom: 0;
          border-radius: 0;
        }
      }
    }
  }
}
</style>
