import { CartItemProps } from "../components/Types/Types";

const addToCart = (
  product: CartItemProps,
  selectedColor: string,
  selectedSize: string
) => {
  if (selectedColor && selectedSize) {
    const newCartItem = {
      ...product,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    };

    return newCartItem;
  }
};

export default addToCart;
