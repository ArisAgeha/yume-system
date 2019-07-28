<template>
  <div class="signup">
    <div class="signup-wrapper">
      <div class="signup-body" @mousedown="lockModal = true">
        <h1>梦蝶系统</h1>
        <el-form
          :model="formData"
          ref="signupForm"
          :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="formData.username" placeholder="账户名，注册后无法修改" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="formData.password" placeholder="不小于8位的密码" />
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input type="password" v-model="formData.confirmPassword" placeholder="请确认您的密码" />
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="formData.email" placeholder="请填写您的邮箱地址，必填" />
          </el-form-item>
          <el-form-item>
            <div>
              没有什么需要同意的
              <el-button type="text">《协议》</el-button>
            </div>
            <div class="submit-button-wrapper">
              <el-button type="primary" @click="submitForm('signupForm')">提交</el-button>
            </div>
          </el-form-item>
        </el-form>
        <div class="login-button-wrapper">
          <el-button @click="jumpLogin" type="text">已有账号，去登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/store';
import { isEmail } from '@/plugins/tools';
import services from '@/services';
import { publicKey } from '@/plugins/key';

export default {
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
    let confirmPasswordValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    let emailValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!isEmail(value)) {
        callback(new Error('请输入正确格式的邮箱地址'));
      } else {
        callback();
      }
    };

    return {
      lockModal: false,
      formData: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
      },
      rules: {
        username: [{ validator: usernameValidator, trigger: 'blur' }],
        password: [{ validator: passwordValidator, trigger: 'blur' }],
        confirmPassword: [{ validator: confirmPasswordValidator, trigger: 'blur' }],
        email: [{ validator: emailValidator, trigger: 'blur' }]
      }
    };
  },
  methods: {
    jumpLogin() {
      this.$router.push('/login');
    },
    handleClose(done) {
      if (!this.lockModal) done();
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const JSEncrypt = (await import('jsencrypt')).default;
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(publicKey);
            const encrypted = encrypt.encrypt(JSON.stringify(this.formData));

            await services.user.signup(encrypted);
            const userData = await services.user.login(encrypted);
            store.authorization.authForUser(userData);
            this.$message.success('注册成功！');
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
.signup {
  background-color: #e6eaee;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  .signup-wrapper {
    margin: auto;
    width: 450px;
    padding: 50px;
    background-color: #fff;
  }

}
.signup-body {
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
