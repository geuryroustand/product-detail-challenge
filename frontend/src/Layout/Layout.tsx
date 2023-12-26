import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import Cart from "../components/Cart/Cart";

const Layout = () => {
  const [showCart, setShowCart] = useState(false); // Changed initial state to false
  const onClick = () => {
    setShowCart(!showCart);
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles["header-nav"]}>
          <div className={styles["header-nav--wrapper"]} onClick={onClick}>
            <span className={styles["header-nav--counter"]}>0</span>
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
