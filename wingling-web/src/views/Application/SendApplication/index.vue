<template>
  <div class="send_application">
    <div class="application_main">
      <div class="application_time">
        <div class="title">
          <span>*</span>
          补卡时间
        </div>
        <div class="date_time_picker">
          <DatePicker
            v-model="selectDate"
            @handlerDatePick="handlerDatePick"
            class="date_picker"
          />
          <TimePicker
            v-model="timeRange"
            @setTimeRange="handlerTimePick"
            class="timer_picker"
          />
        </div>
      </div>

      <div class="application_count">
        本月已申请{{ applicationHistory.length }}次补卡
      </div>

      <div class="application_reason">
        <div class="title">
          <span>*</span>
          补卡理由
        </div>
        <div class="text">
          <textarea
            class="application_reason_textarea"
            name="application_reason"
            ref="application_reason_textarea"
            @input="handleReasonInput"
            placeholder="请输入补卡理由"
            :maxlength="maxReasonLength"
            v-model="applicationReason"
            required
          ></textarea>
          <div class="reason_counter">
            {{ currentReasonLength }}/{{ maxReasonLength }}
          </div>
        </div>
      </div>
    </div>

    <div class="application_footer">
      <div class="footer_left">
        <label @click="saveDraft">
          <svg
            t="1690536644231"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3631"
            width="30"
            height="30"
          >
            <path
              d="M904.533333 972.8H290.133333c-37.717333 0-68.266667-30.549333-68.266666-68.266667V373.077333c0-37.717333 30.549333-68.266667 68.266666-68.266666h614.4c37.717333 0 68.266667 30.549333 68.266667 68.266666V904.533333c0 37.717333-30.549333 68.266667-68.266667 68.266667z"
              fill="#333333"
              opacity=".3"
              p-id="3632"
            ></path>
            <path
              d="M897.194667 468.821333h-24.576V126.805333c0-51.2-41.472-92.672-92.672-92.672H244.053333c-51.2 0-92.672 41.472-92.672 92.672v342.016H126.805333c-51.2 0-92.672 41.472-92.672 92.501334v335.872c0 51.2 41.472 92.672 92.672 92.672h770.56c51.029333 0 92.672-41.472 92.672-92.672V561.322667a92.859733 92.859733 0 0 0-92.842666-92.501334zM202.581333 126.805333C202.581333 103.936 221.184 85.333333 244.053333 85.333333h535.893334c22.869333 0 41.472 18.602667 41.472 41.472v342.016h-109.056c-14.165333 0-25.6 11.434667-25.6 25.6v123.221334H352.597333v-123.221334c0-14.165333-11.434667-25.6-25.6-25.6h-124.416V126.805333zM938.666667 897.365333c0 22.869333-18.602667 41.472-41.472 41.472H126.805333C103.936 938.666667 85.333333 920.064 85.333333 897.365333V561.322667c0-22.869333 18.602667-41.472 41.472-41.472h174.592v123.221333c0 14.165333 11.434667 25.6 25.6 25.6h385.365334c14.165333 0 25.6-11.434667 25.6-25.6v-123.221333h159.232c22.869333 0 41.472 18.602667 41.472 41.472v336.042666z"
              fill="#333333"
              p-id="3633"
            ></path>
            <path
              d="M313.173333 266.581333h397.824c14.165333 0 25.6-11.434667 25.6-25.6s-11.434667-25.6-25.6-25.6H313.173333c-14.165333 0-25.6 11.434667-25.6 25.6s11.434667 25.6 25.6 25.6zM554.666667 386.730667c0-14.165333-11.434667-25.6-25.6-25.6H313.173333c-14.165333 0-25.6 11.434667-25.6 25.6s11.434667 25.6 25.6 25.6H529.066667c14.165333 0 25.6-11.434667 25.6-25.6z"
              fill="#333333"
              p-id="3634"
            ></path>
          </svg>
          <div class="title">存草稿</div>
        </label>
      </div>
      <div class="footer_right">
        <button class="btn-send" @click="submitApplication">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import TimePicker from "@/components/TimePicker/index.vue";
import DatePicker from "@/components/DatePicker/index.vue";
import { saveApplyCard, getApplyCard, clearApplyCard } from "@/utils/applyCache";
import { applyMakeupClock } from "@/apis/apply/index";
import showNotice from '@/utils/notice';

export default {
  props: {
    applicationHistory: {
      type: Array,
      default: () => []
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectDate: null,
      timeRange: null,
      maxReasonLength: 200,
      currentReasonLength: 0,
      applicationReason: "",
    };
  },
  components: {
    TimePicker,
    DatePicker,
  },
  methods: {
    handlerDatePick(date) {
      this.selectDate = date;
    },
    handlerTimePick(time) {
      this.timeRange = time;
    },
    handleReasonInput() {
      this.currentReasonLength =
        this.$refs.application_reason_textarea.value.length;
    },
    saveDraft() {
      if (
        this.selectDate === null &&
        this.timeRange === null &&
        this.applicationReason === ""
      ) {
        return showNotice('warning', '你还没有填写任何东西哦');
      }
      const params = {
        selectDate: this.selectDate,
        timeRange: this.timeRange,
        applicationReason: this.applicationReason,
      };
      saveApplyCard(params);
      showNotice('success', '保存成功');
    },
    async submitApplication() {
      if (this.timeRange === null || this.date === null) {
        return showNotice('warning', '请选择补卡时间');
      } else if (this.applicationReason === '') {
        return showNotice('warning', '请输入补卡理由');
      }
      const params = {
        userId: this.info._id,
        realname: this.info.realname,
        date: this.selectDate,
        startTime: this.timeRange[0],
        endTime: this.timeRange[1],
        reason: this.applicationReason,
        duration: this.$moment(this.timeRange[1], "HH:mm").diff(
          this.$moment(this.timeRange[0], "HH:mm"),
          "minutes"
        )
      };
      try {
        await applyMakeupClock(params);
        showNotice('success', '提交补卡申请成功', '系统已通知管理员，待处理完成后将自动通知您。');
        clearApplyCard();
      } catch (err) {
        console.warn(err);
      } finally {
        this.selectDate = null;
        this.timeRange = null;
        this.applicationReason = '';
      }
    },
  },
  created() {
    const params = getApplyCard();
    if (!params) return;
    this.selectDate = params.selectDate;
    this.timeRange = params.timeRange;
    this.applicationReason = params.applicationReason;
  },
};
</script>

<style lang="scss" scoped>
.send_application {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;

  .application_main {
    flex: 1;
    .application_time {
      background-color: #fff;
      margin-top: 10px;
      padding: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      border-radius: 5px;

      .title {
        margin-top: 5px;
        span {
          color: #ff0000;
          font-size: 12px;
        }
      }

      .date_time_picker {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .timer_picker {
          margin: 5px;
        }

        .date_picker {
          margin: 5px;
        }
      }
    }

    .application_count {
      color: #808080;
      font-size: 13px;
      margin: 5px 10px;
    }

    .application_reason {
      background-color: #fff;
      margin-top: 10px;
      padding: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      border-radius: 5px;

      .title {
        margin-top: 5px;
        span {
          color: #ff0000;
          font-size: 12px;
        }
      }

      .text {
        margin: 0 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .application_reason_textarea {
          padding: 5px;
          width: 100%;
          height: 80px;
          resize: none;
          border: none;
          outline: none;
          font-size: 14px;
          line-height: 1.5;
          box-sizing: border-box;
        }

        .reason_counter {
          color: #808080;
          font-size: 12px;
        }
      }
    }
  }

  .application_footer {
    display: flex;
    height: 60px;
    align-items: center;
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;

    .footer_left {
      flex: 1;
      flex-shrink: 0;
      min-width: 50px;

      &:active {
        color: #000;
        font-weight: bolder;
      }

      label {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        align-items: center;

        .title {
          font-size: 14px;
          color: #808080;
        }
      }
    }

    .footer_right {
      flex: 5;
      padding: 5px;
      box-sizing: border-box;
      .btn-send {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 10px;
        background: #21a1f1;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        letter-spacing: 2px;
        box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.2) -20px -20px 30px
          rgba(33, 161, 241, 1);
        transition: all 0.3 ease-out;

        &:active {
          transform: translateY(1px);
          box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(230, 58, 51, 0.8),
            inset 10px 10px 20px rgba(0, 0, 0, 0.1),
            inset -10px -10px 20px rgba(33, 161, 241, 1);
          font-size: 17px;
        }
      }
    }
  }
}
</style>
