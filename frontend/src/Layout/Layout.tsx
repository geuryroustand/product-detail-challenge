import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import { FiShoppingCart } from "react-icons/fi";
import { useEffect, useState } from "react";
import Cart from "../components/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Link } from "react-router-dom";
import { getUserById } from "../store/userSlice";

import { updatedWithLocalStorage } from "../store/updateStorageCart";

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showCart, setShowCart] = useState(false);

  const { user } = useSelector((state: RootState) => state.user);
  const { storageCart } = useSelector((state: RootState) => state.storageCart);

  const totalItemsInCart = user ? user.cartItems.length : storageCart.length;

  const onClick = () => {
    setShowCart(!showCart);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("userId", user?._id || "");
    }

    const userId = localStorage.getItem("userId");
    if (userId && !user) {
      dispatch(getUserById(userId));
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      const getUpdatedItemsFromStorage = localStorage.getItem("cart");

      if (getUpdatedItemsFromStorage) {
        dispatch(updatedWithLocalStorage(getUpdatedItemsFromStorage));
      }
    }
  }, []);

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
              {totalItemsInCart}
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
