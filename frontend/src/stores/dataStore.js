import { defineStore } from "pinia";
export const useDataStore = defineStore("dataStore", {
  state: () => ({
    dough: [],
    ingredients: [],
    misc: [],
    sauce: [],
    sizes: [],
  }),
  getters: {},
  actions: {},
});
