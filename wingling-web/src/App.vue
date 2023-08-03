<template>
  <div id="app">
    <router-view />
    <FooterGuide v-if="!$route.meta.hideFooterGuide" />
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/index.vue";

export default {
  name: "App",
  components: { FooterGuide },
};
</script>

<style>
#app {
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  background: #f4f4f4f4;
}
</style>