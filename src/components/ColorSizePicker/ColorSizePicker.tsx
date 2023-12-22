import React, { useState } from "react";
import styles from "./ColorSizePicker.module.scss";

interface ColorSizePickerProps {
  type: "color" | "size";
}

const ColorSizePicker = ({ type }: ColorSizePickerProps) => {
  const [selectedItem, setSelectedItem] = useState(
    type === "color" ? "Black" : "Size"
  );

  const selectItem = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className={styles.picker}>
      <p className={styles.label}>
        {type === "color" ? "Color" : "Size"}: {selectedItem}
      </p>
      <div className={styles.options}>
        <span
          className={`${styles.option} ${
            type === "color" && styles["option--black"]
          } ${selectedItem === "Black" && styles["option--selected"]}`}
          onClick={() => selectItem("Black")}
        ></span>
        <span
          className={`${styles.option} ${
            type === "color" && styles["option--white"]
          } ${selectedItem === "White" && styles["option--selected"]}`}
          onClick={() => selectItem("White")}
        ></span>
      </div>
    </div>
  );
};

export default ColorSizePicker;
