import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <>
      <p>Navigation</p>
      <main className={styles.main}>
        <Outlet />
      </main>
      <p>Footer</p>
    </>
  );
};

export default Layout;
