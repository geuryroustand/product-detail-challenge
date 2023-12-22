import Button from "../../components/Button/Button";
import ColorSizePicker from "../../components/ColorSizePicker/ColorSizePicker";

import Title from "../../components/Title/Title";
import styles from "./ProductDetail.module.scss";

interface Props {}

const ProductDetail = (props: Props) => {
  return (
    <div>
      <img width={300} src="/product1.webp" alt="pan" />
      <Title title="Tour Crew Neck Sweatshirt" />

      <div className={styles.priceWrapper}>
        <span className={styles["priceWrapper-price"]}>Price:</span>
        <span className={styles["priceWrapper-value"]}>30€</span>
      </div>

      <ColorSizePicker type="color" />

      <p>
        Go kalles this summer with this vintage navy and white striped v-neck
        t-shirt from the Nike. Perfect for pairing with denim and white kicks
        for a stylish kalles vibe.
      </p>
      <Button variant="primary" size="full">
        Add to card
      </Button>
    </div>
  );
};

export default ProductDetail;
