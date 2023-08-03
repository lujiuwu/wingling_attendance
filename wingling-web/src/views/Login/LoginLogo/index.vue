<template>
  <transition
    name="animate__animated animate__bounce"
    appear
    enter-active-class="animate__bounceInLeft"
  >
    <div class="login-logo">
      <img class="logo" :src="logoSrc" alt="Logo" />
      <div class="title">
        <h1 class="title_text">
          <span
            v-for="(c, index) in firstTitle"
            :style="{ animationDelay: `${index * 0.1}s` }"
            :key="index"
            class="title_char"
            >{{ c.trim() ? c : "&nbsp;" }}</span
          >
        </h1>
        <h2 class="title_text">
          <span
            v-for="(c, index) in secondTitle"
            :style="{ animationDelay: `${index * 0.1}s` }"
            :key="index"
            class="title_char"
            >{{ c.trim() ? c : "&nbsp;" }}</span
          >
        </h2>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  mounted() {},
  props: {
    firstTitle: {
      type: String,
      default: "Welcome!",
    },
    secondTitle: {
      type: String,
      default: "Sign in to continue",
    },
    logoSrc: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.login-logo {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    width: 200px;
    height: 200px;
  }

  .title {
    text-align: center;
    letter-spacing: 2px;

    @keyframes fancyColor {
      0% {
        color: #138fb1;
        text-shadow: 1px 1px #ff0000;
      }
      25% {
        color: #f05365;
        text-shadow: 2px 2px #00ff00;
      }
      50% {
        color: #fcd769;
        text-shadow: 3px 3px #0000ff;
      }
      75% {
        color: #8a56ac;
        text-shadow: 4px 4px #ffff00;
      }
      100% {
        color: #138fb1;
        text-shadow: 5px 5px #ff00ff;
      }
    }

    .title_text {
      font-family: "Consolas";
      font-size: 1.8em;
      color: #555;
      transform: rotate(-6deg);
      display: flex;
      justify-content: center;
      animation: fancyColor 5s infinite;

      .title_char {
        transform: skew(-6deg);
        opacity: 0;
        animation: move 1s cubic-bezier(0.56, 0.09, 0.49, 1.37) forwards;
      }

      @keyframes move {
        from {
          opacity: 0;
          transform: skew(-6deg) translateY(300%);
        }
        to {
          opacity: 1;
          transform: skew(-6deg) translateY(0);
        }
      }
    }
  }
}
</style>