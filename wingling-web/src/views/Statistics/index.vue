<template>
  <div class="statistics">
    <Tab :activeTab="activeTab" :tabs="tabs" @changeTab="handleTabChange">
      <TeamRank v-if="activeTab === 0" :info="info"/>
      <PersonalRecords v-else-if="activeTab === 1" :info="info" @changeTab="handleTabChange"/>
    </Tab>
  </div>
</template>

<script>
import PersonalRecords from './PersonalRecords/index.vue';
import Tab from '@/components/Tab/index.vue';
import TeamRank from './TeamRank/index.vue';
import { mapState } from "vuex";

export default {
  data() {
    return {
      tabs: [
        {
          title: "团队排行",
        },
        {
          title: "个人记录",
        },
      ],
      activeTab: 0,
    };
  },
  computed: {
    ...mapState("user", ["info"]),
  },
  methods: {
    handleTabChange(index) {
      this.activeTab = index;
    }
  },
  components: {
    PersonalRecords,
    TeamRank,
    Tab
  }
};
</script>

<style scoped>
.statistics {
  height: calc(100% - 96px);
  box-sizing: border-box;
  padding: 5px;
}
</style>
