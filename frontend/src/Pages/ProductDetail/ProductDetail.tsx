import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import ColorSizePicker from "../../components/ColorSizePicker/ColorSizePicker";
import Title from "../../components/Title/Title";
import styles from "./ProductDetail.module.scss";
import ProductPrice from "../../components/ProductPrice/ProductPrice";
import ProductDescription from "../../components/ProductDescription/ProductDescription";
import addToCart from "../../components/helper/addToCart";
import { useDispatch } from "react-redux";
import { FetchConfig, fetchApiData } from "../../components/store/fetchSlice";
import { AppDispatch } from "../../components/store/store";
import { useParams } from "react-router-dom";

export interface CartItemProps {
  id: string;
  quantity: number;
  title: string;
  price: number;
  color: string;
  size: string;
}

const ProductDetail = () => {
  const [cart, setCart] = useState<CartItemProps[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const { productId } = useParams();

  console.log("productId", productId);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const config: FetchConfig = {
      url: "http://localhost:8080/product",
      method: "GET",
    };

    dispatch(fetchApiData(config));
  }, []);

  const product = {
    id: "1",
    title: "Tour Crew Neck Sweatshirt",
    price: 30,
    quantity: 1,
    color: "black",
    size: "medium",
  };

  const manageAddToCart = () => {
    if (selectedColor !== undefined && selectedSize !== undefined) {
      const updatedCart = addToCart(product, selectedColor, selectedSize, cart);
      setCart(updatedCart);
    }
  };

  const selectedItemColorOrSize = (item: string, type: "color" | "size") => {
    if (type === "color") {
      setSelectedColor(item);
    } else {
      setSelectedSize(item);
    }
  };

  return (
    <div className={styles.productDetail}>
      <img
        className={styles["productDetail-image"]}
        src="/product1.webp"
        alt="pan"
      />

      <div className={styles["productDetail-right"]}>
        <Title title="Tour Crew Neck Sweatshirt" />
        <ProductPrice price={30} />
        <ColorSizePicker
          selectedItemColorOrSize={selectedItemColorOrSize}
          type="size"
        />
        <ColorSizePicker
          selectedItemColorOrSize={selectedItemColorOrSize}
          type="color"
        />

        <ProductDescription
          description="   Finally—a white sneaker for the rest of your life. Whether you’re
          walking, working, or simply kicking it, the versatile and understated
          Royale Blanco is going to get you where you need to go. It might even
          help you feel better about where you are right now. Every great outfit
          is built from the ground up. Start here. Typography is the work of
          typesetters, compositors, typographers, graphic designers, art
          directors, manga artists, comic book artists, graffiti artists, and
          now—anyone who arranges words, letters, numbers, and symbols for
          publication, display, or distribution—from clerical workers and
          newsletter writers to anyone self-publishing materials"
        />
        <Button onClick={manageAddToCart} variant="primary" size="full">
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
