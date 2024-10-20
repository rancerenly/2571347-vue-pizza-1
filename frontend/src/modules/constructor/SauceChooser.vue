<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce in sauces"
      :key="sauce.id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauce.name"
        :checked="modelValue === sauce.name"
        @input="emit('update:modelValue', $event.target.value)"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script setup>
import sauces from "./../../mocks/sauces.json";
defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
// radio
.radio {
  cursor: pointer;
  span {
    @include r-s16-h19;
    position: relative;
    padding-left: 28px;
    &:before {
      @include p_center-v;
      display: block;
      box-sizing: border-box;
      width: 20px;
      height: 20px;
      content: "";
      transition: 0.3s;
      border: 1px solid $purple-400;
      border-radius: 50%;
      background-color: $white;
    }
  }
  &:hover {
    input:not(:checked):not(:disabled) + span {
      &:before {
        border-color: $purple-800;
      }
    }
  }
  input {
    display: none;
    &:checked + span {
      &:before {
        border: 6px solid $green-500;
      }
    }
    &:disabled {
      & + span {
        &:before {
          border-color: $purple-400;
          background-color: $silver-200;
        }
      }
      &:checked + span {
        &:before {
          border: 6px solid $purple-400;
        }
      }
    }
  }
}
.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 14px;
  p {
    @include r-s16-h19;
    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}
.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
.sheet {
  padding-top: 15px;
  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}
.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}
.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;
  border-top: 1px solid rgba($green-500, 0.1);
}
.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  color: $black;
  &--big {
    @include b-s36-h42;
  }
  &--small {
    @include b-s18-h21;
  }
}
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
</style>
