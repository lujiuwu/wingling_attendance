<template>
  <section class="msite">
    <MsiteHeader />
    <MsiteMain/>
  </section>
</template>

<script>
import MsiteHeader from './MsiteHeader/index.vue';
import MsiteMain from './MsiteMain/index.vue';

export default {
  components: {
    MsiteHeader,
    MsiteMain
  }
};
</script>

<style scoped>
.msite {
  display: flex;
  flex-direction: column;
  height: calc(100% - 96px);
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
}
</style>