<template>
  <div
    class="icon-container"
    :class="{ active: activeIcon === name }"
    @click="ActiveHandler"
    v-html="svgContent"
  ></div>
</template>
  
  <script>
export default {
  props: {
    name: String,
    activeIcon: String,
    svgContent: {
      type: String,
      required: true,
    },
  },
  methods: {
    ActiveHandler() {
      this.$emit("clickHandler", this.name);
    },
  },
};
</script>
  
  <style scoped>
.icon-container {
  border-radius: 50%;
  height: 60px;
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
}

.icon-container.active {
  background-color: #3dd598;
  transform: scale(1.1);
}
</style>