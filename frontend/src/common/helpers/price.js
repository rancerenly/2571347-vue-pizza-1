export const getPrice = (pizza, dougs, allIngredients, sauces, sizes) => {
  const { dough, size, sauce, ingredients } = pizza;
  const sizeMultiplier =
    sizes.find((item) => item.value === size)?.multiplier ?? 1;
  const doughPrice = dougs.find((item) => item.value === dough)?.price ?? 0;
  const saucePrice = sauces.find((item) => item.value === sauce)?.price ?? 0;
  const ingredientsPrice = allIngredients
    .map((item) => ingredients[item.value] * item.price)
    .reduce((acc, item) => acc + item, 0);

  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
};

export default getPrice;
