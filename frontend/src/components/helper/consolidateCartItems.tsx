interface CartItem {
  productId: string;
  _id?: string;
  productName: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
}

const consolidateCartItems = (
  items: CartItem[]
): { consolidatedItems: CartItem[]; totalPrice: number } => {
  const updatedCart: CartItem[] = [];

  items.forEach((item) => {
    const existingItemIndex = updatedCart.findIndex(
      (updatedItem) =>
        updatedItem.productId === item.productId &&
        updatedItem.color === item.color &&
        updatedItem.size === item.size
    );

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += item.quantity;
    } else {
      updatedCart.push({ ...item });
    }
  });

  const totalPrice = updatedCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return { consolidatedItems: updatedCart, totalPrice };
};

export default consolidateCartItems;
