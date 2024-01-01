import { CartItem } from "../components/Types/Types";

const addToCart = (
  product: CartItem,
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
