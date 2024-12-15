import { defineStore } from "pinia";
import { useDataStore } from "@/stores/dataStore";
import { getPizzaPrice } from "@/common/helpers/price";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    phone: "",
    address: {
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    pizzas: [],
    misc: [],
  }),
  getters: {
    getPizzasExtended: (state) => {
      const data = useDataStore();

      return state.pizzas.map((pizza) => {
        const pizzaIngredientsIds = pizza.ingredients.map(
          (i) => i.ingredientId,
        );

        return {
          name: pizza.name,
          quantity: pizza.quantity,
          dough: data.doughs.find((i) => i.id === pizza.doughId),
          size: data.sizes.find((i) => i.id === pizza.sizeId),
          sauce: data.sauces.find((i) => i.id === pizza.sauceId),
          ingredients: data.ingredients.filter((i) =>
            pizzaIngredientsIds.includes(i.id),
          ),
          price: getPizzaPrice(pizza),
        };
      });
    },
    miscExtended: (state) => {
      const data = useDataStore();

      return data.misc.map((misc) => {
        return {
          ...misc,
          quantity: state.misc.find((i) => i.miscId === misc.id)?.quantity ?? 0,
        };
      });
    },
    total: (state) => {
      const pizzaPrices = state.getPizzasExtended
        .map((item) => item.quantity * item.price)
        .reduce((acc, val) => acc + val, 0);

      const miscPrices = state.miscExtended
        .map((item) => item.quantity * item.price)
        .reduce((acc, val) => acc + val, 0);

      return pizzaPrices + miscPrices;
    },
  },
  actions: {
    savePizza(pizza) {
      const { index, ...pizzaData } = pizza;

      if (index !== null) {
        this.pizzas[index] = {
          quantity: this.pizzas[index].quantity,
          ...pizzaData,
        };
      } else {
        this.pizzas.push({
          quantity: 1,
          ...pizzaData,
        });
      }
    },
    setPizzaQuantity(index, count) {
      if (this.pizzas[index]) {
        this.pizzas[index].quantity = count;
      }
    },
    setMiscQuantity(miscId, count) {
      const miscIdx = this.misc.findIndex((item) => item.miscId === miscId);

      if (miscIdx === -1 && count > 0) {
        this.misc.push({
          miscId,
          quantity: 1,
        });
        return;
      } else if (miscIdx === -1) {
        return;
      }

      if (count === 0) {
        this.misc.splice(miscIdx, 1);
        return;
      }

      this.misc[miscIdx].quantity = count;
    },
    setPhone(phone) {
      this.phone = phone;
    },
    setAddress(address) {
      const { street, building, flat, comment } = address;
      this.address = { street, building, flat, comment };
    },
    setStreet(street) {
      this.address.street = street;
    },
    setBuilding(building) {
      this.address.building = building;
    },
    setFlat(flat) {
      this.address.flat = flat;
    },
    setComment(comment) {
      this.address.street = comment;
    },
  },
});
