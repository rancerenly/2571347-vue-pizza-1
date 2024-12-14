import { defineStore } from "pinia";
import doughJSON from "@/mocks/dough.json";
import ingredientsJSON from "@/mocks/ingredients.json";
import saucesJSON from "@/mocks/sauces.json";
import sizesJSON from "@/mocks/sizes.json";
import miscJSON from "@/mocks/misc.json";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "@/common/helpers/normalize";

const normalizeData = (data, normalizeFunction) => data.map(normalizeFunction);

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    doughs: normalizeData(doughJSON, normalizeDough),
    ingredients: normalizeData(ingredientsJSON, normalizeIngredients),
    sauces: normalizeData(saucesJSON, normalizeSauces),
    sizes: normalizeData(sizesJSON, normalizeSize),
    misc: miscJSON,
  }),
});
