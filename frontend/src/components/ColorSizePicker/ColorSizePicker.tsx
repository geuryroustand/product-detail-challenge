import { useState } from "react";
import styles from "./ColorSizePicker.module.scss";

interface ColorSizePickerProps {
  type: "color" | "size";
  selectedItemColorOrSize: (item: string, type: "color" | "size") => void;
}

const ColorSizePicker = ({
  type,
  selectedItemColorOrSize,
}: ColorSizePickerProps) => {
  const [selectedItem, setSelectedItem] = useState("");

  const selectItem = (item: string) => {
    setSelectedItem(item);
    selectedItemColorOrSize(item, type);
  };

  return (
    <div className={styles.picker}>
      <p className={styles.label}>
        {type === "color" ? "Color" : "Size"}: {selectedItem}
      </p>

      {type === "color" ? (
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
      ) : (
        <div className={styles.size}>
          <span
            className={`${styles["size--option"]} ${
              selectedItem === "Small" && styles["size--selected"]
            }`}
            onClick={() => selectItem("Small")}
          >
            S
          </span>
          <span
            className={`${styles["size--option"]} ${
              selectedItem === "Medium" && styles["size--selected"]
            }`}
            onClick={() => selectItem("Medium")}
          >
            M
          </span>
        </div>
      )}
    </div>
  );
};

export default ColorSizePicker;
