<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      placeholder="Введите название пиццы"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
// visually-hidden
.visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  white-space: nowrap;
  border: 0;
  clip-path: inset(100%);
}
// input
.input {
  display: block;
  span {
    @include r-s14-h16;
    display: block;
    margin-bottom: 4px;
  }
  input {
    @include r-s16-h19;
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;
    transition: 0.3s;
    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;
    font-family: inherit;
    &:focus {
      border-color: $green-500;
    }
  }
  &:hover {
    input {
      border-color: $black;
    }
  }
  &--big-label {
    display: flex;
    align-items: center;
    span {
      @include b-s16-h19;
      margin-right: 16px;
      white-space: nowrap;
    }
  }
}
</style>
