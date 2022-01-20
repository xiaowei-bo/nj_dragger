<template>
    <div class="login">
        <Header />
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <div class="title-container">
                <h3 class="title">
                    系统登录
                    <p class="switch" @click="toRegion">注册</p>
                </h3>
            </div>
            <el-form-item prop="userCode">
                <span class="svg-container">
                    <i class="iconfont icon-user"></i>
                </span>
                <el-input
                    ref="userCode"
                    v-model="loginForm.userCode"
                    placeholder="请输入用户名"
                    name="userCode"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <i class="iconfont icon-password"></i>
                </span>
                <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="请输入密码"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                    @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                    <i :class="passwordType === 'password' ? 'iconfont icon-no_eye' : 'iconfont icon-eye'"></i>
                </span>
            </el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
        </el-form>
        <Footer />
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { login } from "@/api/user";
export default {
    name: "Home",
    components: { Header, Footer },
    data() {
        return {
            loginForm: {
                password: "",
                userCode: ""
            },
            loginRules: {
                userCode: [{ required: true, trigger: "blur" }],
                password: [{ required: true, trigger: "blur" }]
            },
            passwordType: "password",
            loading: false
        };
    },
    methods: {
        showPwd() {
            if (this.passwordType === "password") {
                this.passwordType = "";
                return;
            }
            this.passwordType = "password";
        },
        async handleLogin() {
            this.loading = true;
            const res = await login(this.loginForm);
            this.loading = false;
            if (res.userName) {
                this.$message.success("登录成功");
                await this.$store.dispatch("setUserInfo");
                setTimeout(() => {
                    this.$router.push({
                        name: "home"
                    });
                }, 1000);
            } else {
                this.$message.error("用户不存在或密码错误");
            }
        },
        toRegion() {
            this.$router.push({
                name: "userRegion"
            });
        }
    },
    created() {
    }
};
</script>

<style lang="scss">
$bg:#283443;
$dark_gray:#889aa4;
.login {
    width: 100%;
    height: 100%;
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
        color: #333;
        height: 47px;
        caret-color: #333;
      }
    }
    .el-form-item {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
}
.login {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    box-sizing: border-box;
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
      color: #333;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      position: relative;
      .switch{
          font-size: 14px;
          font-weight: normal;
          position: absolute;
          right: 0;
          bottom: 3px;
          color: #409EFF;
          cursor: pointer;
      }
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
    .iconfont{
        font-size: 20px;
    }
  }
}
</style>
