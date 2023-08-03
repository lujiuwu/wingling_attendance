<template>
  <transition
    name="animate__animated animate__bounce"
    appear
    enter-active-class="animate__bounceInUp"
  >
    <div class="login-form">
      <form @submit.prevent="onSubmit">
        <InputBox
          imgSrc="/assets/images/login/user.png"
          placeholder="账号"
          v-model="username"
          :minlength="12"
          tips="请正确输入账号"
        />
        <InputBox
          imgSrc="/assets/images/login/password.png"
          placeholder="密码"
          v-model="password"
          type="password"
          tips="请正确输入密码"
        />

        <div class="remember">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            v-model="rememberMe"
          />remember me
        </div>

        <button type="submit" class="btn-login">登录</button>
      </form>
    </div>
  </transition>
</template>

<script>
import InputBox from "@/components/InputBox/index.vue";
import { getLoginInfo } from "@/utils/auth";
export default {
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
    };
  },
  components: {
    InputBox,
  },
  methods: {
    onSubmit() {
      this.$emit("my-login", {
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe,
      });
    },
  },
  created() {
    const params = getLoginInfo();
    if (params) {
      this.username = params.username;
      this.password = params.password;
      this.rememberMe = params.rememberMe;
    }
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 90%;

    .remember {
      font-family: "Consolas";
      margin-bottom: 20px;
      display: flex;
      align-items: center;

      input {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid #8b8a8a;
        outline: none;
        box-sizing: border-box;
        transition: all 0.3s ease;
        margin-right: 10px;
      
        &:checked {
          background-color: #2e2e2e;
        }
      }
    }

    .btn-login {
      position: relative;
      display: block;
      margin: 0 auto;
      width: 90%;
      padding: 20px;
      border: none;
      border-radius: 50px;
      background: linear-gradient(to bottom, #f44336, #d32f2f);
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      letter-spacing: 2px;
      box-shadow: 20px 20px 30px rgba(0,0,0,0.2)
      -20px -20px 30px rgba(230, 58, 51, 1);
      transition: all 0.3 ease-out;

      &:active {
        transform: translateY(1px);
        box-shadow:
        0 0 0 rgba(0, 0, 0, 0.2),
        0 0 0 rgba(230, 58, 51, 0.8),
        inset 10px 10px 20px rgba(0, 0, 0, 0.1),
        inset -10px -10px 20px rgba(230, 58, 51, 1);
        font-size: 17px;
      }
    }
  }
}
</style>