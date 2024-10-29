export const isDisableCookButton = (pizza) => {
  return (
    pizza.name.length === 0 ||
    Object.values(pizza.ingredients).every(
      (ingredientCount) => ingredientCount === 0,
    )
  );
};

export default isDisableCookButton;
