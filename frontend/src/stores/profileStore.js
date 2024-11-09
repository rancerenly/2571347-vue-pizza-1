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
  getters: {},
  actions: {},
});
