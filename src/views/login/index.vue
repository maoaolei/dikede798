<template>
  <div class="login-container">
    <div class="loginbox">
      <img src="@/assets/common/logo.png" alt="" class="pic">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <el-form-item prop="loginName">
          <i class="el-icon-mobile-phone"></i>
          <el-input
            ref="username"
            v-model="loginForm.loginName"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
          <i class="el-icon-unlock"></i>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="code">
          <span class="iconfont icon-yanzhengyanzhengma"></span>
          <el-input
            ref="catchcode"
            v-model="loginForm.code"
            placeholder="请输入验证码"
            name="catchcode"
            type="text"
            tabindex="1"
            auto-complete="on"
            @keyup.enter.native="add"
          />
          <span class="codeimg" @click="freshen"><img :src="baseURL+codeimg" alt=""></span>
        </el-form-item>
        <el-button
          class="loginBtn"
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click="handleLogin"
        >登录</el-button>

      </el-form>
    </div>
    <el-alert
      v-if="flag"
      :title="msg"
      type="error"
      show-icon
      center
    >
    </el-alert>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getCode } from '@/api/login'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的同户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码格式不对'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        clientToken: 0,
        loginType: 0
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      baseURL: '',
      codeimg: '',
      msg: '',
      flag: false
    }
  },
  created() { this.getCode() },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    add() {
      this.handleLogin()
    },
    async handleLogin() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/loginAction', this.loginForm)
        console.log(this.$store.state.user.msg)
        if (this.$store.state.user.msg === '登录成功') {
          this.$router.push('/')
        } else {
          this.msg = this.$store.state.user.msg
          this.flag = true
        }
      } finally {
        this.loading = false
      }
    },
    freshen() {
      this.getCode()
    },
    async getCode() {
      this.loginForm.clientToken = Math.floor(Math.random() * 15)
      const res = await getCode(this.loginForm.clientToken)
      this.baseURL = res.config.baseURL
      this.codeimg = res.config.url
      // console.log(res)
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray: #68b0fe;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/background.png'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    border: 1px solid #e9ebec;
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__error {
    color: red
  }
  .loginBtn {
  background: #6c7ef0;
  height: 54px;
  border-radius: 10px;
  line-height: 32px;
  font-size: 16px;
}
.loginbox {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding-top: 20px;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
    .pic {
    position: absolute;
    width: 96px;
    height: 96px;
    top: -46px;
    left: 50%;
    margin-left: -48px;
    }
    .codeimg {
      position: absolute;
      top: 0;
      right: 0;
    }

}
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 40px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
