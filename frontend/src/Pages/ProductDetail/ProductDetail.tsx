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

import Image from "../../components/Image/Image";
import { CartItem } from "../../components/Types/Types";
import { updatedWithLocalStorage } from "../../store/updateStorageCart";
import { getUserById } from "../../store/userSlice";
import { fetchUrl } from "../../helper/environmentVariable";

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const { productId } = useParams();

  const { loading, data, error } = useSelector(
    (state: RootState) => state.fetch
  );

  const { user } = useSelector((state: RootState) => state.user);

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
      url: `${fetchUrl}/product/${productId}`,
      method: "GET",
    };

    dispatch(fetchProductDetails(config));
  }, []);

  const selectedProduct: CartItem = {
    productId: data?._id || "",
    userId: user?._id,
    productName: data?.productName || "",
    price: data?.price || 0,
    quantity: data?.quantity || 0,
    color: selectedColor,
    size: selectedSize,
  };

  const manageAddToCart = async () => {
    if (selectedColor !== undefined && selectedSize !== undefined) {
      try {
        if (user) {
          await dispatch(fetchUpdateCart(selectedProduct));
          await dispatch(getUserById(user._id));
        } else {
          const getItemFromLocalStorage = localStorage.getItem("cart");

          let items: CartItem[] = [];

          if (getItemFromLocalStorage) {
            items = JSON.parse(getItemFromLocalStorage) as CartItem[];
          }
          const updatedItems = [...items, selectedProduct];

          localStorage.setItem("cart", JSON.stringify(updatedItems));

          const getUpdatedItemsFromStorage = localStorage.getItem("cart");

          if (getUpdatedItemsFromStorage) {
            dispatch(updatedWithLocalStorage(getUpdatedItemsFromStorage));
          }
        }
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
