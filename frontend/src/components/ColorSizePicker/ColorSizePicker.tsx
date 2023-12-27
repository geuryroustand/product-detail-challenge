import { useState } from "react";
import styles from "./ColorSizePicker.module.scss";

interface ColorSizePickerProps {
  type: "color" | "size";
  selectedItemColorOrSize: (item: string, type: "color" | "size") => void;
  options: string[];
}

const ColorSizePicker = ({
  type,
  selectedItemColorOrSize,
  options,
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
      <div className={type === "color" ? styles.options : styles.size}>
        {options.map((option, index) => (
          <span
            key={`${index}-${option.toLowerCase()}`}
            className={`${
              type === "color"
                ? `${styles.option} ${
                    styles[`option--${option.toLowerCase()}`]
                  }`
                : styles["size--option"]
            } ${selectedItem === option && styles["size--selected"]}`}
            onClick={() => selectItem(option)}
          >
            {type === "color" ? "" : option.slice(0, 1).toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ColorSizePicker;
