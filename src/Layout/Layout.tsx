import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <p>Navigation</p>
      <Outlet />
      <p>Footer</p>
    </>
  );
};

export default Layout;
