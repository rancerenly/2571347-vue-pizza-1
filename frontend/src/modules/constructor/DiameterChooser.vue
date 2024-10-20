<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input--${pizzaSize[size.multiplier]}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.multiplier"
            :checked="modelValue === size.multiplier"
            class="visually-hidden"
            @input="emit('update:modelValue', $event.target.value)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import sizes from "@/mocks/sizes.json";
const pizzaSize = { 1: "small", 2: "normal", 3: "big" };

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

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
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

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;
  cursor: pointer;

  span {
    @include r-s16-h19;
    position: relative;
    padding-left: 46px;

    &::before {
      @include p_center_v;
      width: 36px;
      height: 36px;
      content: "";
      transition: 0.3s;
      border-radius: 50%;
      background-color: $green-100;
      background-image: url("@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
