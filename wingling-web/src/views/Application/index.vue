<template>
  <div class="application">
    <Tab :activeTab="activeTab" :tabs="tabs" @changeTab="handleTabChange">
      <SendApplication v-if="activeTab === 0" :info="info" :applicationHistory = "applicationHistory"/>
      <ApplicationHistory v-else-if="activeTab === 1" :info="info" :applicationHistory = "applicationHistory" @changeTab="handleTabChange"/>
    </Tab>
  </div>
</template>

<script>
import Tab from "@/components/Tab/index.vue";
import SendApplication from "./SendApplication/index.vue";
import ApplicationHistory from "./ApplicationHistory/index";
import { getApplyHistory } from "@/apis/apply/index";
import { mapState } from "vuex";

export default {
  data() {
    return {
      tabs: [
        {
          title: "发起提交",
        },
        {
          title: "查看数据",
        },
      ],
      activeTab: 0,
      applicationHistory: []
    };
  },
  methods: {
    handleTabChange(index) {
      this.activeTab = index;
    },
  },
  components: {
    Tab,
    SendApplication,
    ApplicationHistory,
  },
  computed: {
    ...mapState("user", ["info"]),
  },
  async created() {
    const { data } = await getApplyHistory(this.info._id);
    this.applicationHistory = data;
  },
};
</script>

<style lang="scss" scoped>
.application {
  height: 100%;
  box-sizing: border-box;
  padding: 5px;
}
</style>
