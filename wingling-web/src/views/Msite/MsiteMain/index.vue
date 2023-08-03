<template>
  <main class="msite_main">
    <div class="msite_clock" v-if="clock_info.clockInTime">
      <div class="clock_in clock">
        <div class="title">上班 {{ clock_info.clockInTime }}</div>
        <div class="foot">
          <div class="time">
            <svg
              t="1690777698266"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2312"
              width="16"
              height="16"
            >
              <path
                d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m-49.590857-377.197714L315.977143 498.614857 219.428571 590.848c70.217143 37.814857 168.594286 106.788571 252.854858 213.723429C531.821714 692.662857 715.337143 463.725714 804.571429 443.245714c-14.409143-57.709714-22.528-166.034286 0-223.817143-183.003429 120.685714-342.162286 427.373714-342.162286 427.373715z"
                fill="#3DD598"
                p-id="2313"
              ></path>
            </svg>
            <span>{{ clock_info.clockInTime }} 已打卡</span>
          </div>
        </div>
      </div>
      <div class="clock_out clock">
        <div class="title">下班 {{ clock_info.clockOutTime }}</div>
        <div class="foot">
          <div class="time">
            <div class="out" v-if="clock_info.clockOutTime">
              <svg
                t="1690777698266"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2312"
                width="16"
                height="16"
              >
                <path
                  d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m-49.590857-377.197714L315.977143 498.614857 219.428571 590.848c70.217143 37.814857 168.594286 106.788571 252.854858 213.723429C531.821714 692.662857 715.337143 463.725714 804.571429 443.245714c-14.409143-57.709714-22.528-166.034286 0-223.817143-183.003429 120.685714-342.162286 427.373714-342.162286 427.373715z"
                  fill="#3DD598"
                  p-id="2313"
                ></path>
              </svg>
              <span>{{ clock_info.clockOutTime }} 已打卡</span>
            </div>
            <div class="no_out" v-else>
              未打卡
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="msite_content">
      <div
        class="msite_do"
        :class="{ pulse: isPulse, shake: isShake }"
        @click="clockHandler"
      >
        <div class="msite_do_status">
          {{ info.isClockedIn ? "休息一下" : "开始内卷" }}
        </div>
        <div class="msite_do_time">{{ time }}</div>
      </div>
    </div>
  </main>
</template>

<script>
import showNotice from "@/utils/notice";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      time: "",
      timer: "",
      lastClockedTime: null,
    };
  },
  computed: {
    ...mapState("user", ["info", "clock_info"]),
    isPulse() {
      return !this.info.isClockedIn;
    },
    isShake() {
      return this.info.isClockedIn;
    },
  },
  methods: {
    ...mapActions("user", ["ClockIn", "ClockOut"]),
    getTime() {
      let hour = new Date().getHours().toString().padStart(2, "0");
      let minute = new Date().getMinutes().toString().padStart(2, "0");
      let second = new Date().getSeconds().toString().padStart(2, "0");
      this.time = hour + ":" + minute + ":" + second;
    },
    async clockHandler() {
      const params = {
        userId: this.info._id,
      };
      const now = new Date();
      const lastClockedTime = this.lastClockedTime;
      if (
        lastClockedTime &&
        now.getTime() - lastClockedTime.getTime() < 5000
      ) {
        return showNotice("warning", "5秒内不能再次打卡哦");
      }
      if (!this.info.isClockedIn) {
        try {
          await this.ClockIn(params);
          showNotice("success", "上卡成功");
          this.lastClockedTime = now;
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          await this.ClockOut(params);
          showNotice("success", "下卡成功");
          this.lastClockedTime = now;
        } catch (err) {
          console.error(err);
        }
      }
    },
  },
  mounted() {
    this.timer = setInterval(this.getTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.msite_main {
  flex: 1;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 5px;
  align-items: center;
}

.msite_clock {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .clock {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 5px;
    box-sizing: border-box;
    margin: 5px;
    border-radius: 5px;
    .foot {
      margin-top: 5px;
      display: flex;
      align-items: end;
      justify-content: space-between;
      font-size: 14px;

      .time {
        display: flex;
        align-items: center;
        color: #808080;

        .out {
          display: flex;
          align-items: center;
        }
        span {
          margin-left: 2px;
        }
      }
    }
  }
}

.msite_do {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-color: #3dd598;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #fff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
}

.msite_content {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(61, 213, 152, 0.4);
  }

  70% {
    transform: scale(1.3);
    box-shadow: 0 0 0 10px rgba(61, 213, 152, 0);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(61, 213, 152, 0);
  }
}

@keyframes shakeX {
  0% {
    transform: translateX(0);
  }

  10% {
    transform: translateX(-1px) rotate(-1deg);
  }

  20% {
    transform: translateX(1px) rotate(1deg);
  }

  30% {
    transform: translateX(-1px) rotate(-1deg);
  }

  40% {
    transform: translateX(1px) rotate(1deg);
  }

  50% {
    transform: translateX(0) rotate(0);
  }

  100% {
    transform: translateX(0) rotate(0);
  }
}

.msite_do.shake {
  animation: shakeX 0.5s infinite;
  transform-origin: center;
  background: red;
}

.msite_do.pulse {
  animation: pulse 2s infinite;
}

.msite_do_time {
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  margin-top: 5px;
}
</style>