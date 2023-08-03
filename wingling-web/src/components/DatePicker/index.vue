<template>
  <wingling-date-picker
    v-model="innerValue"
    :type="type"
    :placeholder="placeholder"
    :value-format="valueFormat"
    :editable="editable"
    :picker-options="pickerOptions"
    @change="DatePickHandler"
    v-bind="$attrs"
    class="wingling-date-picker"
  >
  </wingling-date-picker>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(date) {
          return date && date.getTime() > Date.now();
        },
      },
      innerValue: this.value,
    };
  },
  props: {
    value: {
      type: [String, Date],
      default: "",
    },
    type: {
      type: String,
      default: "date",
    },
    placeholder: {
      type: String,
      default: "请选择日期",
    },
    editable: {
      type: Boolean,
      default: false,
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    }
  },
  methods: {
    DatePickHandler() {
      this.$emit("handlerDatePick", this.innerValue);
    },
  },
  watch: {
    value(newValue) {
      this.innerValue = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.wingling-date-picker {
  width: 100%;
  border-radius: 0;
  border: none;
}
</style>