import { ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: ReactNode;
  variant: "primary" | "secondary";
  size: "small" | "full";
  className?: string;
};

const Button = ({ variant, children, size }: ButtonProps) => {
  const getButtonVariant = styles[variant];
  const getButtonSize = styles[size];

  return (
    <button className={`${getButtonVariant} ${getButtonSize}`}>
      {children}
    </button>
  );
};

export default Button;
