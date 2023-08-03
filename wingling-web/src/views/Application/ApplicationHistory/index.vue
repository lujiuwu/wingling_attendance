<template>
  <div class="application_history">
    <div v-if="applicationHistory.length" class="application_list">
      <div
        v-for="(application, index) in applicationHistory"
        :key="index"
        class="application_item"
      >
        <div class="item_title">
          <div class="title_left">{{ info.realname }}提交的补卡</div>
          <div class="title_right">{{ application.date }}</div>
        </div>
        <div class="item_main">
          <div class="main_left">
            <div class="application_total">
              补卡时长：{{ application.duration }}分钟
            </div>
            <div class="application_reason">
              补卡理由：{{ application.reason }}
            </div>
          </div>
          <div class="main_right">
            <div class="application_time">
              起始时间：{{ application.startTime }}
            </div>
            <div class="application_time">
              结束时间：{{ application.endTime }}
            </div>
          </div>
        </div>
        <div class="item_footer">
          <div class="footer_left">
            <img class="avatar" :src="info.avatar" alt="avatar" />
            <div class="application_person">由{{ info.realname }}提交</div>
          </div>
          <div
            class="footer_right"
            :class="getApprovalClass(application.status)"
          >
            {{ getApprovalMessage(application.status) }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="application_empty">
      <wingling-empty
        :image-size="200"
        description="暂无补卡申请"
      ></wingling-empty>
    </div>
    <div class="application_add" @click="goToAdd">
      <svg
        t="1690552258404"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="11599"
        width="50"
        height="50"
      >
        <path
          d="M669.86496 916.48H354.13504C218.496 916.48 107.52 805.504 107.52 669.86496V354.13504C107.52 218.496 218.496 107.52 354.13504 107.52h315.73504C805.504 107.52 916.48 218.496 916.48 354.13504v315.73504C916.48 805.504 805.504 916.48 669.86496 916.48z"
          fill="#1296db"
          opacity=".3"
          p-id="11600"
        ></path>
        <path
          d="M650.68032 477.33248h-104.00768V373.31968a34.67264 34.67264 0 0 0-69.33504 0v104.00768H373.31968a34.66752 34.66752 0 0 0 0 69.33504h104.00768v104.00768a34.67264 34.67264 0 0 0 69.33504 0V546.6624h104.00768a34.66752 34.66752 0 0 0 0.01024-69.32992z"
          fill="#1296db"
          p-id="11601"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    applicationHistory: {
      type: Array,
      default: () =>[]
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    goToAdd() {
      const activeIndex = 0;
      this.$emit("changeTab", activeIndex);
    },
    getApprovalClass(status) {
      if (status === "pending") {
        return "approval_pending";
      } else if (status === "pass") {
        return "approval_pass";
      } else if (status === "reject") {
        return "approval_reject";
      }
    },
    getApprovalMessage(status) {
      if (status === "pending") {
        return "审批处理中";
      } else if (status === "pass") {
        return "审批通过";
      } else if (status === "reject") {
        return "审批未通过";
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.application_history {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  scrollbar-width: none;

  .application_list {
    height: 100%;
    .application_item {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin: 10px 0;
      box-sizing: border-box;
      background-color: #fff;
      padding: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      border-radius: 5px;

      .item_title {
        display: flex;
        margin: 5px 0;
        justify-content: space-between;

        .title_left {
          font-size: 18px;
        }

        .title_right {
          font-size: 12px;
          color: #808080;
        }
      }

      .item_main {
        display: flex;
        margin: 5px 0;
        justify-content: space-between;
        color: #808080;
        font-size: 14px;

        .main_left {
          .application_reason {
            margin-top: 5px;
          }
        }

        .main_right {
          .application_time {
            margin-top: 5px;
          }
        }
      }

      .item_footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
        font-size: 14px;

        .footer_left {
          display: flex;
          align-items: center;

          img {
            height: 20px;
            width: 20px;
            border-radius: 5px;
            margin-right: 2px;
            box-shadow: 5px 5px 15px -4px rgba(0, 0, 0, 0.5);
          }
        }

        .approval_pending {
          color: rgb(255, 128, 0);
        }
        .approval_pass {
          color: #19c37d;
        }

        .approval_reject {
          color: #ff0000;
        }
      }
    }
  }

  .application_empty {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .application_add {
    position: fixed;
    bottom: 20px;
    right: 5px;
  }
}
</style>