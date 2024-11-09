<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <AppDrag
          :data-transfer="ingredient"
          :draggable="modelValue[ingredient.value] < MAX_INGREDIENT_COUNT"
        >
          <div class="filling">
            <img :src="getImage(ingredient.image)" :alt="ingredient.name" />
            {{ ingredient.name }}
          </div>
        </AppDrag>
        <AppCounter
          :value="modelValue[ingredient.value]"
          :min="0"
          :max="3"
          @update:value="updateValue($event, ingredient.value)"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import AppCounter from "@/common/components/AppCounter.vue";
import AppDrag from "@/common/components/AppDrag.vue";
import { MAX_INGREDIENT_COUNT } from "@/common/constants/constants";
import { Ingredients } from "../../common/helpers/ingredients-init.helper";
const props = defineProps({
  modelValue: {
    type: Ingredients,
    required: true,
  },
  ingredients: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update:modelValue"]);

const updateValue = (newValue, ingredientName) => {
  const updatedIngredients = new Ingredients({
    ...props.modelValue,
    [ingredientName]: newValue,
  });
  emit("update:modelValue", updatedIngredients);
};

const getImage = (image) => {
  return new URL(`../../assets/img/${image}`, import.meta.url).href;
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
// filling

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  img {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    box-sizing: border-box;
    padding: 4px;

    border-radius: 50%;
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
