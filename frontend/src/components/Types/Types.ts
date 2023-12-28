interface CartItemProps {
  productId: string;
  quantity: number;
  productName: string;
  price: number;
  color: string;
  size: string;
}

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

export type { CartItemProps, ProductProps };
