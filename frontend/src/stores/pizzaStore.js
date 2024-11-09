import { ref, computed } from "vue";

import { defineStore } from "pinia";

import doughJSON from "@/mocks/dough.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
import ingredientsJSON from "@/mocks/ingredients.json";

import { Ingredients } from "../common/helpers/IngedientChooserHelper";

import getPrice from "@/common/helpers/price";

import {
  normalizeDough,
  normalizeSauces,
  normalizeSize,
  normalizeIngredients,
} from "@/common/helpers/normalize";

const ingredients = ingredientsJSON.map(normalizeIngredients);
const dougs = doughJSON.map(normalizeDough);
const sauces = saucesJSON.map(normalizeSauces);
const sizes = sizesJSON.map(normalizeSize);

const EMPTY_PIZZA = {
  name: "",
  dough: dougs[0].value,
  size: sizes[0].value,
  sauce: sauces[0].value,
  ingredients: new Ingredients(),
};

export const usePizzaStore = defineStore("pizzaStore", () => {
  const pizza = ref(EMPTY_PIZZA);
  const getPizza = computed(() => pizza.value);

  const addIngredient = (ingredient) => {
    pizza.value.ingredients[ingredient]++;
  };

  const updateIngredients = (ingredients) => {
    pizza.value.ingredients = ingredients;
  };

  const getPizzaPrice = (pizza) => {
    return getPrice(pizza, dougs, ingredients, sauces, sizes);
  };

  return { pizza, getPizza, addIngredient, updateIngredients, getPizzaPrice };
});
