interface ProductProps {
  _id: string;
  productName: string;
  price: number;
  quantity: number;
  colors: [string];
  sizes: [string];
  productDescription: string;
  image: string;
}

interface User {
  message: string;
  user: UserClass;
}
export interface GetUserByID {
  _id: string;
  username: string;
  email: string;
  cartItems: CartItem[];
  __v: number;
}

interface UserClass {
  _id: string;
  username: string;
  email: string;
  cartItems: CartItem[];
  __v: number;
}
interface CartItem {
  _id?: string;
  productId: string;
  userId?: string;
  quantity: number;
  productName: string;
  price: number;
  color: string;
  size: string;
  __v?: number;
}

export type { ProductProps, User, CartItem, UserClass };
