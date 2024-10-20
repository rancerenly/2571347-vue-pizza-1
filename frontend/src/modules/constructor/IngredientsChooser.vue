<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <span
          class="filling"
          :class="`filling--${ingredientMapper[ingredient.id]}`"
          >{{ ingredient.name }}</span
        >

        <div class="counter counter--orange ingredients__counter">
          <button
            type="button"
            class="counter__button counter__button--minus"
            :disabled="modelValue[ingredientMapper[ingredient.id]] < 1"
            @click="decrement(ingredientMapper[ingredient.id])"
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input
            type="text"
            name="counter"
            class="counter__input"
            :value="modelValue[ingredientMapper[ingredient.id]]"
            @input="set($event, ingredientMapper[ingredient.id])"
          />
          <button
            type="button"
            class="counter__button counter__button--plus"
            @click="increment(ingredientMapper[ingredient.id])"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import ingredients from "./../../mocks/ingredients.json";
import ingredientMapper from "../../common/data/ingredients";

import { Ingredients } from "./IngedientChooserHelper";
const props = defineProps({
  modelValue: {
    type: Ingredients,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
const set = (event: any, ingredientName: string) => {
  console.log('set');
  const newValue = new Ingredients({
    ...props.modelValue,
    [ingredientName]: Number(event.target.value) || 0,
  });
  emit("update:modelValue", newValue);
};
const increment = (ingredientName: string) => {
  const newValue = new Ingredients({
    ...props.modelValue,
    [ingredientName]: (props.modelValue[ingredientName] || 0) + 1,
  });
  emit("update:modelValue", newValue);
};
const decrement = (ingredientName: string) => {
  const newValue = new Ingredients({
    ...props.modelValue,
    [ingredientName]: (props.modelValue[ingredientName] || 0) - 1,
  });
  emit("update:modelValue", newValue);
};

</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
.ingredients__filling {
  width: 100%;
  p {
    @include r-s16-h19;
    margin-top: 0;
    margin-bottom: 16px;
  }
}
.ingredients__list {
  @include clear-list;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}
.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
// counter
.counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.counter__button {
  $el: &;
  $size_icon: 50%;
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  border-radius: 50%;
  outline: none;
  &--minus {
    background-color: $purple-100;
    &::before {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      border-radius: 2px;
      background-color: $black;
    }
    &:hover:not(:active):not(:disabled) {
      background-color: $purple-200;
    }
    &:active:not(:disabled) {
      background-color: $purple-300;
    }
    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }
    &:disabled {
      cursor: default;
      &::before {
        opacity: 0.1;
      }
    }
  }
  &--plus {
    background-color: $green-500;
    &::before {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      border-radius: 2px;
      background-color: $white;
    }
    &::after {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      transform: translate(-50%, -50%) rotate(90deg);
      border-radius: 2px;
      background-color: $white;
    }
    &:hover:not(:active):not(:disabled) {
      background-color: $green-400;
    }
    &:active:not(:disabled) {
      background-color: $green-600;
    }
    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }
    &:disabled {
      cursor: default;
      opacity: 0.3;
    }
  }
  &--orange {
    background-color: $orange-200;
    &:hover:not(:active):not(:disabled) {
      background-color: $orange-100;
    }
    &:active:not(:disabled) {
      background-color: $orange-300;
    }
  }
}
.counter__input {
  @include r-s14-h16;
  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;
  text-align: center;
  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;
  &:focus {
    box-shadow: inset $shadow-regular;
  }
}
// filling
.filling {
  @include r-s14-h16;
  position: relative;
  display: block;
  padding-left: 36px;
  &::before {
    @include p_center-v;
    display: block;
    width: 32px;
    height: 32px;
    content: "";
    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }
  &--tomatoes::before {
    background-image: url("@/assets/img/filling/tomatoes.svg");
  }
  &--ananas::before {
    background-image: url("@/assets/img/filling/ananas.svg");
  }
  &--bacon::before {
    background-image: url("@/assets/img/filling/bacon.svg");
  }
  &--blue_cheese::before {
    background-image: url("@/assets/img/filling/blue_cheese.svg");
  }
  &--cheddar::before {
    background-image: url("@/assets/img/filling/cheddar.svg");
  }
  &--chile::before {
    background-image: url("@/assets/img/filling/chile.svg");
  }
  &--ham::before {
    background-image: url("@/assets/img/filling/ham.svg");
  }
  &--jalapeno::before {
    background-image: url("@/assets/img/filling/jalapeno.svg");
  }
  &--mozzarella::before {
    background-image: url("@/assets/img/filling/mozzarella.svg");
  }
  &--mushrooms::before {
    background-image: url("@/assets/img/filling/mushrooms.svg");
  }
  &--olives::before {
    background-image: url("@/assets/img/filling/olives.svg");
  }
  &--onion::before {
    background-image: url("@/assets/img/filling/onion.svg");
  }
  &--parmesan::before {
    background-image: url("@/assets/img/filling/parmesan.svg");
  }
  &--salami::before {
    background-image: url("@/assets/img/filling/salami.svg");
  }
  &--salmon::before {
    background-image: url("@/assets/img/filling/salmon.svg");
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
