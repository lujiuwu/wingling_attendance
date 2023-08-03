<template>
  <header class="msite_header">
    <div class="header_left">
      <img :src="info.avatar" alt="user-img" />
      <div class="header_title">
        <div class="header_title_name">{{ info.realname }}</div>
        <div class="header_title_company">翼灵物联网工作室</div>
      </div>
    </div>
    <div class="header_right">
      <label @click="actionHandler">
        <img src="/assets/images/msite/apply.png" alt="apply" />
        <div class="header_right_action">申请</div>
      </label>
    </div>
  </header>
</template>

<script>
import router from '@/router';
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('user', ['info'])
  },
  methods: {
    actionHandler() {
      router.push('/application');
    }
  }
};
</script>

<style lang="scss" scoped>
.msite_header {
  display: flex;
  height: 120px;
  background-color: #fff;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  justify-content: space-between;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 5px;

  .header_left {
    margin-left: 20px;
    display: flex;
    align-items: center;

    img {
      width: 55px;
      height: 55px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      margin-right: 10px;
    }

    .header_title {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .header_title_name {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      .header_title_company {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .header_right {
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    flex-direction: column;

    &:active {
      font-weight: bolder;
      color: #000;
    }

    img {
      width: 40px;
      height: 40px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      border-radius: 8px;
    }

    .header_right_action {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
}
</style>