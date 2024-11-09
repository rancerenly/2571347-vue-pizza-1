import { useDataStore } from "@/stores/dataStore";
import { mapIngredientQuantities } from "@/common/helpers/ingredient-quantities.helper";

export const getPizzaPrice = (pizza) => {
  const data = useDataStore();
  const ingredients = mapIngredientQuantities(pizza);

  const getItemPrice = (items, id, defaultValue) => {
    const item = items.find((item) => item.id === id);
    return item ? item.price : defaultValue;
  };

  const sizeMultiplier = getItemPrice(data.sizes, pizza.sizeId, 1);
  const doughPrice = getItemPrice(data.doughs, pizza.doughId, 0);
  const saucePrice = getItemPrice(data.sauces, pizza.sauceId, 0);

  const ingredientsPrice = data.ingredients.reduce((total, ingredient) => {
    const ingredientQuantity = ingredients[ingredient.id] ?? 0;
    return total + ingredientQuantity * ingredient.price;
  }, 0);

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
};
