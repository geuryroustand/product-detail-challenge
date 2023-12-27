import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import Image from "../Image/Image";

interface CardProps {
  item: {
    _id: string;
    image: string;
    productName: string;
  };
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <Link to={`product-detail/${item._id}`} key={item._id}>
      <div className={styles.card}>
        <Image
          className={styles["card-image"]}
          imageUrl={item.image}
          altText={item.productName}
        />
        <p>{item.productName}</p>
      </div>
    </Link>
  );
};

export default Card;
