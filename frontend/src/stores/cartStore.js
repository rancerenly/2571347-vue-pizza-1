import { defineStore } from "pinia";
export const useCartStore = defineStore("cartStore", {
  state: () => ({
    phone: "",
    address: {},
    pizzas: [],
    misc: [],
  }),
  getters: {},
  actions: {},
});
