<template>
  <div class="personal_records">
    <div class="main" ref="mainContainer">
      <div class="header">
        <div class="left">
          <img :src="info.avatar" alt="avatar" class="avatar" />
          <div class="title">
            <div class="name">{{ info.realname }}</div>
            <div class="organization">翼灵物联网工作室</div>
          </div>
        </div>
        <div class="right">
          <div class="progress_title">完成进度</div>
          <wingling-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="
              calculatePercentage(info.totalDuration, info.targetTime)
            "
            class="progress"
          ></wingling-progress>
        </div>
      </div>
      <div class="calendar_box" :class="{ expanded: isCalendarExpanded }">
        <wingling-calendar :range="calendarRange" v-model="selectedDate">
          <template v-slot:dateCell="{ data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split("-").slice(2).join("") }}
            </p>
          </template>
        </wingling-calendar>
      </div>
      <div class="expand-icon" @click="toggleCalendar">
        <i
          :class="['el-icon-arrow-' + (isCalendarExpanded ? 'up' : 'down')]"
        ></i>
      </div>
      <div class="records">
        <div class="empty" v-if="!attendance || attendance.length === 0">
          <wingling-empty
            :image-size="200"
            description="当天没有打卡记录"
          ></wingling-empty>
        </div>
        <div class="record" v-else>
          <div class="title">
            出勤统计：打卡{{ totalClocks }}次，工时：{{ totalHours }}小时
          </div>
          <div class="record_list">
            <div
              class="record_item"
              v-for="(record, index) in attendance"
              :key="index"
            >
              <wingling-steps direction="vertical" :active="1">
                <wingling-step
                  :title="`上班：${getFormattedTime(record.clockInTime)}`"
                  icon="el-icon-mouse"
                  description="翼灵物联网工作室"
                ></wingling-step>
                <wingling-step
                  v-if="record.clockOutTime"
                  :title="`下班：${getFormattedTime(record.clockOutTime)}`"
                  icon="el-icon-hot-water"
                  description="翼灵物联网工作室"
                ></wingling-step>
              </wingling-steps>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { getPersonalRecords } from "@/apis/statistics/index";
import moment from "moment";
export default {
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isCalendarExpanded: false,
      selectedDate: new Date().toISOString(),
      totalClocks: 0,
      totalHours: 0,
      attendance: null,
      attendanceList: null,
    };
  },
  watch: {
    selectedDate: {
      handler: "getAttendance",
      immediate: true,
    },
  },
  methods: {
    calculatePercentage(totalDuration, targetTime) {
      const percentage = Math.floor((totalDuration / (targetTime * 60)) * 100);
      return percentage <= 100 ? percentage : 100;
    },
    toggleCalendar() {
      this.isCalendarExpanded = !this.isCalendarExpanded;
      if (this.isCalendarExpanded) {
        this.$nextTick(() => {
          setTimeout(() => {
            const mainContainer = this.$refs.mainContainer;
            mainContainer.scrollTo({
              top: mainContainer.scrollHeight,
              behavior: "smooth",
            });
          }, 350);
        });
      } else {
        this.$nextTick(() => {
          setTimeout(() => {
            const mainContainer = this.$refs.mainContainer;
            mainContainer.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }, 350);
        });
      }
    },
    getFormattedTime(time) {
      return this.$moment(time).utcOffset(8).format("HH:mm:ss"); // 因为我数据库存的是utc时间（我在后端处理过可是mongodb存的时候又转成utc了），所以这里要转为上海时间
    },
    calculateWorkHours() {
      let totalHours = 0;
      this.totalClocks = this.attendance.length;

      this.attendance.forEach((record) => {
        if (record.clockOutTime) {
          const clockIn = moment(record.clockInTime);
          const clockOut = moment(record.clockOutTime);
          const duration = Math.round((clockOut - clockIn) / (1000 * 60));
          totalHours += duration;
        }
      });
      this.totalHours = (totalHours / 60).toFixed(2);
    },
    async getAttendance() {
      try {
        if (!this.attendanceList) {
          this.attendanceList = await getPersonalRecords(this.info._id);
        }
        const selectedDate = this.$moment(this.selectedDate).format(
          "yyyy-MM-DD"
        );
        const selectedRecord = this.attendanceList.attendance.find(
          (record) =>
            this.$moment(record.date).format("yyyy-MM-DD") === selectedDate
        );

        if (selectedRecord) {
          // 合并上班和下班时间，创建一个新的记录数组
          const combinedTimes = selectedRecord.clockInTimes.map(
            (time, index) => ({
              clockInTime: time,
              clockOutTime: selectedRecord.clockOutTimes[index] || null,
            })
          );
          this.attendance = combinedTimes;
          this.calculateWorkHours();
        } else {
          this.attendance = [];
          this.totalClocks = 0;
          this.totalHours = 0;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
  computed: {
    calendarRange() {
      if (this.isCalendarExpanded) {
        return null;
      } else {
        const date = new Date(this.selectedDate);
        const dayOfWeek = date.getDay();
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const startDate = new Date(date);
        startDate.setDate(date.getDate() + diff);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        return [startDate.toISOString(), endDate.toISOString()];
      }
    },
  }
};
</script>
  
<style lang="scss" scoped>
.personal_records {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;

  .main {
    flex: 1;
    height: 100%;
    overflow: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px;
    margin-top: 5px;

    .header {
      display: flex;
      width: 100%;
      height: 60px;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 5px;
      border-bottom: 2px dashed #c0c4d1;

      .left {
        display: flex;
        flex: 1;
        height: 100%;
        margin-right: 5px;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          margin-right: 5px;
        }

        .title {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;

          .name {
            font-weight: bolder;
          }

          .organization {
            color: #808080;
            font-size: 14px;
          }
        }
      }

      .right {
        display: flex;
        flex: 1;
        height: 100%;
        flex-direction: column;

        .progress_title {
          font-size: 14px;
          color: #808080;
        }
        .progress {
          flex: 1;
        }
      }
    }

    .calendar_box {
      overflow: hidden;
      height: 160px;
      transition: all 0.35s ease;
      p {
        display: inline-flex;
        height: 40px;
        justify-content: center;
        align-items: center;
        width: 40px;
        border-radius: 50%;
        transition: all 0.5s ease-in-out;
      }
      .is-selected {
        display: inline-flex;
        height: 40px;
        width: 40px;
        justify-content: center;
        align-items: center;
        color: #fff;
        background-color: #3dd598;
        border-radius: 50%;
      }

      &.expanded {
        height: 400px !important;
      }
    }
    .expand-icon {
      text-align: center;
      margin-top: 5px;
      position: relative;

      i {
        &::before {
          font-size: 16px;
          font-weight: bolder;
          color: #c0c4d1;
        }
      }

      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 46%; /* 调整线的长度 */
        height: 1px; /* 调整线的粗细 */
        background-color: #c0c4d1; /* 调整线的颜色 */
      }

      &::before {
        left: 0;
      }

      &::after {
        right: 0;
      }
    }

    .records {
      .empty {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      .record {
        height: 100%;
        display: flex;
        flex-direction: column;

        .title {
          font-size: 14px;
          color: #808080;
          margin: 10px 0 20px 0;
        }

        .record_list {
          .record_item {
            margin-bottom: 20px;
            height: 120px;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .record_item {
    height: 150px !important;
  }
}
</style>