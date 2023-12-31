import React from "react";
import Error from "../Error/Error";
import styles from "./FormField.module.scss";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  id?: string;
  placeholder: string;
  autoComplete: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  showError: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  id,
  placeholder,
  autoComplete,
  onChange,
  name,
  errorMessage,
  showError,
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        name={name}
        id={name}
        className={styles.input}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      {showError && <Error message={errorMessage} />}
    </div>
  );
};

export default FormField;
