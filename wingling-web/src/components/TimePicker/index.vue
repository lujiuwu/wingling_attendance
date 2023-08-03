<template>
  <wingling-time-picker
    :is-range="isRange"
    v-model="timeRange"
    :range-separator="rangeSeparator"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :editable="editable"
    :clearable="clearable"
    :format="format"
    :value-format="valueFormat"
    class="wingling-time-picker"
  >
  </wingling-time-picker>
</template>
  
  <script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    isRange: {
      type: Boolean,
      default: true,
    },
    rangeSeparator: {
      type: String,
      default: "至",
    },
    startPlaceholder: {
      type: String,
      default: "开始时间",
    },
    endPlaceholder: {
      type: String,
      default: "结束时间",
    },
    editable: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      default: 'HH:mm'
    },
    valueFormat: {
      type: String,
      default: 'HH:mm'
    },
    clearable: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    timeRange: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("setTimeRange", newValue);
      },
    },
  }
};
</script>
  
  <style lang="scss" scoped>
.wingling-time-picker {
  width: 100%;
}
</style>