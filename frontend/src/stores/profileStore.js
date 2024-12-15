import { defineStore } from "pinia";
import addressesJSON from "@/mocks/addresses.json";
export const useProfileStore = defineStore("profileStore", {
  state: () => ({
    addresses: addressesJSON,
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
  actions: {
    // пока нет логики с авторизацией в систему
    // eslint-disable-next-line no-unused-vars
    login(email, password) {},
    logout() {
      this.id = 0;
      this.name = "";
      this.email = "";
      this.avatar = "";
      this.phone = "";
      this.orders = [];
      this.addresses = [];
    },
    addOrder(order) {
      this.orders.push(order);
    },
    deleteOrder(id) {
      this.orders = this.orders.filter((order) => order.id !== id);
    },
    clearOrders() {
      this.orders = [];
    },
    addAddress(address) {
      this.addresses.push(address);
    },
    deleteAddress(id) {
      this.addresses = this.addresses.filter((address) => address.id !== id);
    },
  },
});
