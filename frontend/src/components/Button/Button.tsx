import { ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children?: ReactNode;
  variant: "primary" | "secondary";
  size: "small" | "full";
  className?: string;
  onClick?: () => void;
  onSubmit?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  onClick,
  variant,
  children,
  size,
  type = "button",
  onSubmit,
  className,
  disabled,
}: ButtonProps) => {
  const getButtonVariant = styles[variant];
  const getButtonSize = styles[size];

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
      className={`${styles.btn} ${getButtonVariant} ${getButtonSize} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
