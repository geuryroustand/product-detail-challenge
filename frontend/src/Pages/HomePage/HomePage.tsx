import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FetchConfig,
  fetchProductDetails,
} from "../../store/productDetailsSlice";
import { AppDispatch, RootState } from "../../store/store";

import Card from "../../components/Card/Card";

import styles from "./HomePage.module.scss";
import { ProductProps } from "../../components/Types/Types";
import { fetchUrl } from "../../helper/environmentVariable";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const config: FetchConfig = {
      url: `${fetchUrl}/product`,
      method: "GET",
    };

    dispatch(fetchProductDetails(config));
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
