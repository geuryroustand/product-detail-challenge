import styles from "./Cart.module.scss";

const Cart = () => {
  return (
    <div className={styles.cart}>
      <p>title</p>
      <p>size</p>
      <p>Color</p>
      <p>Quantity</p>
      <p>Price</p>
      <p>Total:</p>
    </div>
  );
};

export default Cart;
