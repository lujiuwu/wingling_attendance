<template>
  <div class="login">
    <div class="login-box">
      <LoginLogo logo-src="/assets/images/logo.png" />
      <LoginForm :rememberMe="rememberMe" @my-login="loginHandler" />
    </div>
  </div>
</template>
  
<script>
import LoginLogo from "./LoginLogo/index.vue";
import LoginForm from "./LoginForm/index.vue";
import showNotice from "@/utils/notice";
import { mapActions } from "vuex";
import { saveLoginInfo, clearLoginInfo } from "@/utils/auth";

export default {
  data() {
    return {
      loginParams: null,
      rememberMe: false,
    };
  },
  components: {
    LoginLogo,
    LoginForm,
  },
  methods: {
    ...mapActions("user", ["Login"]),
    async loginHandler(params) {
      const { rememberMe, ...loginParams } = params;
      try {
        await this.Login(loginParams);
        if (rememberMe) {
          saveLoginInfo(params);
        } else {
          clearLoginInfo(params);
        }
        showNotice("success", "登陆成功");
        this.$router.push("/msite");
      } catch (error) {
        console.error(error);
      }
    },
  }
};
</script>
  
<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100%;
  
  .login-box {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #fff;
  }
}
</style>