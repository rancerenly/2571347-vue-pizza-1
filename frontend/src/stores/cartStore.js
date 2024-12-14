import { defineStore } from "pinia";
import { getPizzaPrice } from "@/common/helpers/price";
import { useDataStore } from "@/stores/dataStore";
import { getElementById } from "@/common/helpers/get-element-by-id.helper";

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
      const { doughs, sizes, sauces, ingredients } = useDataStore();

      const getPizzaData = (pizza) => {
        const {
          name,
          quantity,
          doughId,
          sizeId,
          sauceId,
          ingredients: pizzaIngredients,
        } = pizza;
        const selectedIngredients = new Set(
          pizzaIngredients.map((i) => i.ingredientId),
        );

        return {
          name,
          quantity,
          dough: getElementById(doughs, doughId),
          size: getElementById(sizes, sizeId),
          sauce: getElementById(sauces, sauceId),
          ingredients: ingredients.filter((i) => selectedIngredients.has(i.id)),
          price: getPizzaPrice(pizza),
        };
      };

      return state.pizzas.map(getPizzaData);
    },
    miscExtended: (state) => {
      const { misc } = useDataStore();

      const getQuantity = (id) =>
        state.misc.find((item) => item.id === id)?.quantity ?? 0;

      return misc.map((item) => ({
        ...item,
        quantity: getQuantity(item.id),
      }));
    },
    total: (state) => {
      const calculateTotal = (items) =>
        items.reduce((acc, { quantity, price }) => acc + quantity * price, 0);

      return (
        calculateTotal(state.pizzasExtended) +
        calculateTotal(state.miscExtended)
      );
    },
  },
  actions: {
    savePizza(pizza) {
      const { index, ...pizzaData } = pizza;

      const updatePizza = (i) => {
        this.pizzas[i] = {
          ...this.pizzas[i],
          ...pizzaData,
        };
      };

      const addNewPizza = () => {
        this.pizzas.push({
          quantity: 1,
          ...pizzaData,
        });
      };

      if (index !== null && index >= 0) {
        updatePizza(index);
      } else {
        addNewPizza();
      }
    },
    setPizzaQuantity(index, count) {
      if (this.pizzas[index]) {
        this.pizzas[index].quantity = count;
      }
    },

    setMiscQuantity(miscId, count) {
      const miscIdx = this.misc.findIndex((item) => item.miscId === miscId);

      const addMiscItem = () => {
        this.misc.push({ miscId, quantity: 1 });
      };

      const removeMiscItem = () => {
        this.misc.splice(miscIdx, 1);
      };

      const updateMiscQuantity = () => {
        this.misc[miscIdx].quantity = count;
      };

      if (miscIdx === -1) {
        if (count > 0) addMiscItem();
      } else {
        if (count === 0) {
          removeMiscItem();
        } else {
          updateMiscQuantity();
        }
      }
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
