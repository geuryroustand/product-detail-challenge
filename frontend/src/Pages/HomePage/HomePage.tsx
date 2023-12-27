import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FetchConfig,
  ProductProps,
  fetchProductDetails,
} from "../../components/store/productDetailsSlice";
import { AppDispatch, RootState } from "../../components/store/store";

import { fetchCartItems } from "../../components/store/cartItemsSlice";
import Card from "../../components/Card/Card";

import styles from "./HomePage.module.scss";
const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const config: FetchConfig = {
      url: `${import.meta.env.VITE_API_DEV_URL}/product`,
      method: "GET",
    };

    dispatch(fetchProductDetails(config));
    dispatch(fetchCartItems());
  }, []);

  const { loading, data, error } = useSelector(
    (state: RootState) => state.fetch
  );

  const errorMsg = error;

  return loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>{errorMsg}</p>
  ) : data && Array.isArray(data) ? (
    <div className={styles.home}>
      {data.map((item: ProductProps) => (
        <Card key={item._id} item={item} />
      ))}
    </div>
  ) : (
    <p>No data available.</p>
  );
};

export default HomePage;
