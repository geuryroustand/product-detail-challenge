import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import ProductDetail from "../Pages/ProductDetail/ProductDetail";
import App from "../App";

import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "product-detail/:productId",
        element: <ProductDetail />,
      },
    ],
  },
]);
