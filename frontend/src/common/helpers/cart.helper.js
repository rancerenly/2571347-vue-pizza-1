export const calculateCategoryTotal = (items) => {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};
