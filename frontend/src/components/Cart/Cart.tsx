import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./Cart.module.scss";
import consolidateCartItems from "../../helper/consolidateCartItems";

const Cart = () => {
  const { cartItems, loading, error } = useSelector(
    (state: RootState) => state.cart
  );

  const { user } = useSelector((state: RootState) => state.user);

  const { storageCart } = useSelector((state: RootState) => state.storageCart);

  const { consolidatedItems, totalPrice } = user
    ? consolidateCartItems(user?.cartItems)
    : consolidateCartItems(storageCart);

  const errorMsg = error;

  return loading && cartItems === null ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{errorMsg}</p>
  ) : (
    <div className={styles.cart}>
      <h3 className={styles["cart-heading"]}>Shopping Cart</h3>
      {consolidatedItems.map((item) => (
        <div
          className={styles["cart-details"]}
          key={item._id || item.productId}
        >
          <h4 className={styles["cart-productName"]}>{item.productName}</h4>
          <p>Color: {item.size}</p>
          <p>Size: {item.color}</p>
          <p>Qty: {item.quantity}</p>
          <p>{item.price}</p>
        </div>
      ))}
      <h4 className={styles["cart-subtotal"]}>
        Subtotal: ${totalPrice.toFixed(2)}
      </h4>
    </div>
  );
};

export default Cart;
