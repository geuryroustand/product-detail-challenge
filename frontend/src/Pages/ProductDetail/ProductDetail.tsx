import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import ColorSizePicker from "../../components/ColorSizePicker/ColorSizePicker";
import Title from "../../components/Title/Title";
import styles from "./ProductDetail.module.scss";
import ProductPrice from "../../components/ProductPrice/ProductPrice";
import ProductDescription from "../../components/ProductDescription/ProductDescription";

import { useDispatch, useSelector } from "react-redux";
import {
  FetchConfig,
  fetchProductDetails,
} from "../../store/productDetailsSlice";
import { AppDispatch, RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import { fetchUpdateCart } from "../../store/updateCart";
import { fetchCartItems } from "../../store/cartItemsSlice";
import Image from "../../components/Image/Image";
import { CartItemProps } from "../../components/Types/Types";

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const { productId } = useParams();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.fetch
  );

  const errorMsg = error;
  const imageUrl = data?.image || "";
  const productName = data?.productName || "";
  const productDescription = data?.productDescription || "";
  const price = data?.price || 0;
  const colors = data?.colors || [];
  const sizes = data?.sizes || [];

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const config: FetchConfig = {
      url: `${import.meta.env.VITE_API_DEV_URL}/product/${productId}`,
      method: "GET",
    };

    dispatch(fetchProductDetails(config));
    dispatch(fetchCartItems());
  }, []);

  const selectedProduct: CartItemProps = {
    productId: data?._id || "",
    productName: data?.productName || "",
    price: data?.price || 0,
    quantity: data?.quantity || 0,
    color: selectedColor,
    size: selectedSize,
  };

  const manageAddToCart = async () => {
    if (selectedColor !== undefined && selectedSize !== undefined) {
      try {
        await dispatch(fetchUpdateCart(selectedProduct));
        await dispatch(fetchCartItems());
      } catch (error) {
        console.log(error);
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

  return loading && data === null ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{errorMsg}</p>
  ) : (
    <div className={styles.productDetail}>
      <Image
        imageUrl={imageUrl}
        altText={data?.productName || ""}
        className={styles["productDetail-image"]}
      />
      <div className={styles["productDetail-right"]}>
        <Title title={productName} />
        <ProductPrice price={price} />
        <ColorSizePicker
          options={sizes}
          selectedItemColorOrSize={selectedItemColorOrSize}
          type="size"
        />
        <ColorSizePicker
          options={colors}
          selectedItemColorOrSize={selectedItemColorOrSize}
          type="color"
        />

        <ProductDescription description={productDescription} />
        <Button
          className={styles.btn}
          onClick={manageAddToCart}
          variant="primary"
          size="full"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
