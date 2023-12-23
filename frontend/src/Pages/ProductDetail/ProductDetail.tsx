import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import ColorSizePicker from "../../components/ColorSizePicker/ColorSizePicker";
import Title from "../../components/Title/Title";
import styles from "./ProductDetail.module.scss";

interface CartItem {
  id: number;
  quantity: number;
  product: string;
  price: number;
  color: string;
  size: string;
}

const ProductDetail = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();

  const product = {
    id: 1,
    product: "Tour Crew Neck Sweatshirt",
    price: 30,
  };

  const addToCart = () => {
    if (selectedColor && selectedSize) {
      const existingItemIndex = cart.findIndex(
        (item) =>
          item.id === product.id &&
          item.color === selectedColor &&
          item.size === selectedSize
      );

      if (existingItemIndex !== -1) {
        // If the same item exists in the cart, update the quantity instead of adding a new item
        const updatedCart = cart.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });

        setCart(updatedCart);
      } else {
        // Add a new item to the cart
        const newCartItem: CartItem = {
          ...product,
          color: selectedColor,
          size: selectedSize,
          quantity: 1,
        };
        setCart([...cart, newCartItem]);
      }
    }
  };

  const selectedItemColorOrSize = (item: string, type: "color" | "size") => {
    if (type === "color") {
      setSelectedColor(item);
    } else {
      setSelectedSize(item);
    }
  };

  useEffect(() => {
    console.log("cart", cart);
  }, [cart]);

  return (
    <div className={styles.productDetail}>
      <img
        className={styles["productDetail-image"]}
        src="/product1.webp"
        alt="pan"
      />

      <div className={styles["productDetail-right"]}>
        <Title title="Tour Crew Neck Sweatshirt" />
        <div className={styles.priceWrapper}>
          <span className={styles["priceWrapper-price"]}>Price:</span>
          <span className={styles["priceWrapper-value"]}>30€</span>
        </div>
        <ColorSizePicker
          selectedItemColorOrSize={selectedItemColorOrSize}
          type="size"
        />
        <ColorSizePicker
          selectedItemColorOrSize={selectedItemColorOrSize}
          type="color"
        />

        <p>
          Finally—a white sneaker for the rest of your life. Whether you’re
          walking, working, or simply kicking it, the versatile and understated
          Royale Blanco is going to get you where you need to go. It might even
          help you feel better about where you are right now. Every great outfit
          is built from the ground up. Start here. Typography is the work of
          typesetters, compositors, typographers, graphic designers, art
          directors, manga artists, comic book artists, graffiti artists, and
          now—anyone who arranges words, letters, numbers, and symbols for
          publication, display, or distribution—from clerical workers and
          newsletter writers to anyone self-publishing materials
        </p>
        <Button onClick={addToCart} variant="primary" size="full">
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
