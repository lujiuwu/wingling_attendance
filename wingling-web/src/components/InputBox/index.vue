<template>
  <div class="input-box">
    <img :src="imgSrc" :alt="placeholder" v-if="imgSrc" />
    <input
      :type="type"
      :value="value"
      :minlength="minlength"
      @input="$emit('input', $event.target.value)"
      required
      @invalid="setCustomValidity"
      oninput="setCustomValidity('');"
      ref="input"
    />
    <span :class="{ fly: valid }">{{ placeholder }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: this.value.length,
    };
  },
  methods: {
    setCustomValidity() {
      this.$refs.input.setCustomValidity(this.tips);
    }
  },
  watch: {
    value(newValue) {
      this.valid = newValue.length;
    },
  },
  props: {
    imgSrc: {
      type: String,
    },
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    minlength: {
      type: Number,
      default: 6,
    },
    tips: {
      type: String,
      default: ""
    }
  },
};
</script>

<style lang="scss" scoped>
.input-box {
  position: relative;
  display: flex;
  width: 100%;
  height: 50px;
  margin-bottom: 25px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  img {
    padding: 5px;
    max-width: 50px;
    max-height: 50px;
  }

  input {
    border-radius: 0 12px 12px 0;
    padding: 10px;
    border: none;
    font-size: 18px;
    background-color: #fff;
    outline: none;
    width: 100%;
  }

  span {
    position: absolute;
    left: 55px;
    top: 0px;
    padding: 10px;
    font-size: 18px;
    pointer-events: none;
    color: #ccc;
    transition: all 0.5s;
  }

  .fly {
    color: #138fb1;
    transform: translateX(-15px) translateY(-10px);
    font-size: 16px;
    padding: 0 10px;
    background-color: #fff;
  }

  input:focus ~ span {
    color: #138fb1;
    transform: translateX(-15px) translateY(-10px);
    font-size: 16px;
    padding: 0 10px;
    background-color: #fff;
  }
}
</style>