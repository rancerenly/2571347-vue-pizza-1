import { defineStore } from "pinia";
export const useProfileStore = defineStore("profileStore", {
  state: () => ({
    profile: {
      id: "",
      name: "",
      email: "",
      avatar: "",
      phone: "",
      addresses: [],
    },
  }),
  getters: {
    getAddresses: (state) => {
      return state.addresses;
    },
    getOrders: (state) => {
      return state.orders;
    },
    getName: (state) => {
      return state.name;
    },
    getEmail: (state) => {
      return state.email;
    },
    getAvatar: (state) => {
      return state.avatar;
    },
    getPhone: (state) => {
      return state.phone;
    },
  },
  actions: {},
});
