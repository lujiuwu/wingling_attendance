<template>
  <div class="team_rank">
    <header class="statistics_header">
      <div class="statistics_header_progress">
        <wingling-progress
          type="dashboard"
          :percentage="
            calculatePercentage(
              personalProgress.totalDuration,
              personalProgress.targetTime
            )
          "
          :stroke-width="18"
          :color="colors"
          stroke-linecap="round"
        ></wingling-progress>
      </div>
      <div class="statistics_header_right">
        <h3>Weekly Progress</h3>
        <div class="header_right_leftDay">
          There are {{ leftDays }} days left this week!!
        </div>
      </div>
    </header>
    <main class="statistics_main">
      <div class="infinite-list-wrapper">
        <ul class="list">
          <li
            v-for="(item, index) in statisticsList"
            class="list-item"
            :key="index"
          >
            <div class="avatar"><img :src="item.avatar" alt="avatar" /></div>
            <div class="user_info">
              <div class="grade">年级：{{ item.grade }}</div>
              <div class="name">姓名：{{ item.realname }}</div>
            </div>
            <div class="clock_info">
              <div class="target">目标：{{ item.targetTime }} 小时</div>
              <div class="total">
                时长：{{ (item.totalDuration / 60).toFixed(2) }} 小时
              </div>
            </div>
            <div class="progress-wrapper">
              <div class="progress_title">完成进度</div>
              <div class="p_progress">
                <wingling-progress
                  :text-inside="true"
                  :stroke-width="26"
                  :percentage="
                    calculatePercentage(item.totalDuration, item.targetTime)
                  "
                ></wingling-progress>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>
  
<script>
import { getAllStatistics } from "@/apis/statistics/index";
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      leftDays: new Date().getDate() === 0 ? 0 : 7 - new Date().getDay(),
      statisticsList: [],
      personalProgress: {},
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
    };
  },
  methods: {
    calculatePercentage(totalDuration, targetTime) {
      const percentage = Math.floor((totalDuration / (targetTime * 60)) * 100);
      return percentage <= 100 ? percentage : 100;
    },
  },
  async created() {
    const res = await getAllStatistics();
    this.statisticsList = res.data;
    this.statisticsList.forEach((item) => {
      if (item._id === this.info._id) {
        this.personalProgress = item;
      }
      item.avatar = process.env.VUE_APP_API_BASE_URL + item.avatar;
    });
  },
};
</script>
  
<style lang="scss" scoped>
.team_rank {
  display: flex;
  flex-direction: column;
  height: 100%;

  .statistics_header {
    display: flex;
    height: 150px;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    align-items: center;
    box-sizing: border-box;
    justify-content: space-around;
    border-radius: 10px;
    margin-bottom: 5px;
    margin-top: 5px;
    color: #f05365;
    font-family: "BConsolas";
    animation: fancyColor 5s infinite;

    @keyframes fancyColor {
      0% {
        color: #ff9b28;
        /* 将红色调整为橙色 */
        text-shadow: 1px 1px #ff1493;
        /* 将红色调整为粉红色 */
      }

      25% {
        color: #1e90ff;
        /* 将绿色调整为青色 */
        text-shadow: 2px 2px #ff00ff;
        /* 将绿色调整为紫色 */
      }

      50% {
        color: #ffd700;
        /* 将蓝色调整为金色 */
        text-shadow: 3px 3px #00ffff;
        /* 将蓝色调整为青色 */
      }

      75% {
        color: #8b008b;
        /* 将黄色调整为紫色 */
        text-shadow: 4px 4px #00ff00;
        /* 将黄色调整为绿色 */
      }

      100% {
        color: #ff9b28;
        /* 将紫色调整为橙色 */
        text-shadow: 5px 5px #ffff00;
        /* 将紫色调整为黄色 */
      }
    }

    .statistics_header_progress {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5px;
      flex: 1;
      height: 100%;
    }

    .statistics_header_right {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 2;
      height: 100%;

      h3 {
        font-size: 1.5rem;
      }

      .header_right_leftDay {
        margin-top: -10px;
        color: gray;
        font-size: 1.375rem;
        text-align: center;
      }
    }
  }

  .statistics_main {
    flex: 1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10px;
    justify-content: start;
    align-items: center;
    box-sizing: border-box;
    padding: 5px;
    width: 100%;

    .infinite-list-wrapper {
      width: 100%;
      overflow: auto;

      .list {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5px;
        box-sizing: border-box;

        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          border-radius: 10px;
          background-color: #f6f6f6;
          padding: 5px;
          box-sizing: border-box;
          width: 100%;
          height: 65px;
          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

          .avatar {
            flex: 1;
            margin-right: 5px;

            img {
              width: 50px;
              height: 50px;
              border-radius: 10px;
            }
          }

          .user_info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 12px;
            margin-left: -40px;
            height: 100%;
            color: #808080;
            white-space: nowrap;

            .name {
              margin-top: 5px;
            }
          }

          .clock_info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 12px;
            margin-left: -20px;
            height: 100%;
            color: #808080;
            white-space: nowrap;

            .total {
              margin-top: 5px;
            }
          }

          .progress-wrapper {
            flex: 1;
            .progress_title {
              font-size: 14px;
              color: #808080;
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 540px) {
  .progress-wrapper {
    flex: 2.5!important;
  }
}

@media screen and (min-width: 768px) {
  .progress-wrapper {
    flex: 5!important;
  }
}
</style>