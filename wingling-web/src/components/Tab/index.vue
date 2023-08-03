<template>
  <div class="tab">
    <header class="tab_header">
      <div class="tabs">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: activeTab === index }"
          @click="changeTabHandler(index)"
          class="tab_item"
        >
          {{ tab.title }}
          <transition name="underline">
            <div class="underline" v-if="activeTab === index"></div>
          </transition>
        </div>
      </div>
    </header>
    <main class="tab_main">
      <slot></slot>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    activeTab: {
      type: Number,
      required:true
    }
  },
  methods: {
    changeTabHandler(index) {
      this.$emit('changeTab', index);
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  height: 100%;
  box-sizing: border-box;

  .tab_header {
    height: 40px;
    padding: 5px;
    background-color: #fff;
    border-radius: 5px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    .tabs {
      display: flex;
      height: 100%;
      justify-content: space-around;

      .tab_item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        position: relative;
        transition: all 0.3s ease-in-out;

        .underline {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 3px;
          width: 20%;
          border-radius: 15px;
          background-color: black;
        }

        .underline-enter-active,
        .underline-leave-active {
          transition: all 0.3s ease-in-out;
        }

        .underline-enter,
        .underline-leave-to {
          opacity: 0;
          width: 0;
          height: 0;
        }
      }

      .active {
        font-size: 17px;
        font-weight: bolder;
      }
    }
  }

  .tab_main {
    height: calc(100% - 55px);
  }
}
</style>
