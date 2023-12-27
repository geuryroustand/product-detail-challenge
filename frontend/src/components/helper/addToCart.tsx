// import { CartItemProps } from "../../Pages/ProductDetail/ProductDetail";

interface CartItemProps {
  productId: string;
  quantity: number;
  productName: string;
  price: number;
  color: string;
  size: string;
}

const addToCart = (
  product: CartItemProps,
  selectedColor: string,
  selectedSize: string,
  cart: CartItemProps[]
) => {
  if (selectedColor && selectedSize) {
    const existingItem = cart.find(
      (item) =>
        item.productId === product.productId &&
        item.color === selectedColor &&
        item.size === selectedSize
    );

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.productId === existingItem.productId &&
        item.color === existingItem.color &&
        item.size === existingItem.size
          ? {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + item.price,
            }
          : item
      );
      return updatedCart;
    } else {
      const newCartItem = {
        ...product,
        color: selectedColor,
        size: selectedSize,
        quantity: 1,
      };
      return [...cart, newCartItem];
    }
  }
  return cart;
};

export default addToCart;
