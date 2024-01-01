import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import Cart from "../components/Cart/Cart";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";

const Layout = () => {
  const [showCart, setShowCart] = useState(false);

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.user);

  const onClick = () => {
    setShowCart(!showCart);
  };

  const totalItemInCart = cartItems.length;

  return (
    <>
      <header className={styles.header}>
        <Link className={styles["header-link"]} to="/">
          Home
        </Link>
        {!user && (
          <>
            <Link className={styles["header-link"]} to="/login">
              Log in
            </Link>
            <Link className={styles["header-link"]} to="/signup">
              Sign up
            </Link>
          </>
        )}

        {user && <p className={styles["header-username"]}>{user?.username}</p>}

        <nav className={styles["header-nav"]}>
          <div className={styles["header-nav--wrapper"]} onClick={onClick}>
            <span className={styles["header-nav--counter"]}>
              {totalItemInCart}
            </span>
            <FiShoppingCart className={styles["header-nav--icon"]} />
          </div>

          {showCart && <Cart />}
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>Make with 🩷 </p>
      </footer>
    </>
  );
};

export default Layout;
