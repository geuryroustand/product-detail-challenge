import styles from "./ProductPrice.module.scss";

interface ProductPriceProps {
  price: number;
}

const ProductPrice = ({ price }: ProductPriceProps) => {
  return (
    <div className={styles.priceWrapper}>
      <span className={styles["priceWrapper-price"]}>Price:</span>
      <span className={styles["priceWrapper-value"]}>{price}€</span>
    </div>
  );
};

export default ProductPrice;
