import { ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: ReactNode;
  variant: "primary" | "secondary";
  size: "small" | "full";
  className?: string;
  onClick: () => void;
};

const Button = ({ onClick, variant, children, size }: ButtonProps) => {
  const getButtonVariant = styles[variant];
  const getButtonSize = styles[size];

  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${getButtonVariant} ${getButtonSize}`}
    >
      {children}
    </button>
  );
};

export default Button;
