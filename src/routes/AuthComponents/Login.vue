<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-body" @mousedown="lockModal = true">
        <h1>开始旅程</h1>
        <el-form
          :model="formData"
          ref="loginForm"
          :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="formData.username" placeholder="账户名" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="formData.password" placeholder="密码" />
          </el-form-item>
          <el-form-item>
            <div class="submit-button-wrapper">
              <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            </div>
          </el-form-item>
        </el-form>
        <div class="login-button-wrapper">
          <el-button @click="jumpSignup" type="text">注册新账号</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import services from '@/services';
import { store } from '@/store';
import { publicKey } from '@/plugins/key';

export default {
  props: {
  },
  data() {
    let usernameValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (value.length < 6) {
        callback(new Error('用户名长度不得小于6位'))
      } else if (value.length > 18) {
        callback(new Error('用户名长度不得大于18位'))
      } else {
        callback();
      }
    };
    let passwordValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 8) {
        callback(new Error('密码长度不得小于8位'))
      } else {
        callback();
      }
    };

    return {
      lockModal: false,
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: usernameValidator, trigger: 'blur' }],
        password: [{ validator: passwordValidator, trigger: 'blur' }]
      }
    };
  },
  methods: {
    jumpSignup() {
      this.$router.push('/signup');
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const JSEncrypt = (await import('jsencrypt')).default;
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(publicKey);
            const encrypted = encrypt.encrypt(JSON.stringify(this.formData));

            let data = await services.user.login(encrypted);
            store.authorization.authForUser(data);
            this.$message.success('登录成功！');
            this.$router.push('/');
          }
          catch(err) {
            this.$message.error(err.message);
            console.error(err);
          }
        } else {
          return false;
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (store.authorization.isAuthorized) {
      next({ replace: true, path: '/' });
    }
    else {
      next();
    }
  }
};
</script>

<style lang='scss' scoped>
.login {
  background-color: #e6eaee;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  .login-wrapper {
    margin: auto;
    width: 450px;
    padding: 50px;
    background-color: #fff;
  }

}
.login-body {
  h1 {
    text-align: center;
  }
}
.submit-button-wrapper {
  .el-button {
    width: 100%;
  }
}
.login-button-wrapper {
  display: flex;
  justify-content: center;
}
</style>
