// import { CartItemProps } from "../../Pages/ProductDetail/ProductDetail";

interface ProductProps {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  colors: [string];
  sizes: [string];
  productDescription: string;
}

interface CartItemProps {
  id: string;
  quantity: number;
  title: string;
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
  console.log(selectedColor);

  if (selectedColor && selectedSize) {
    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        item.color === selectedColor &&
        item.size === selectedSize
    );

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === existingItem.id &&
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
