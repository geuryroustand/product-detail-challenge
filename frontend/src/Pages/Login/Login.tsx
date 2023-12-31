import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./LoginForm.module.scss";
import Form from "../../components/Form/Form";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { userLogin } from "../../store/userSlice";

type loginProp = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, user, error, errorLog } = useSelector(
    (state: RootState) => state.user
  );

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  console.log("error", error);
  console.log("errorLog", errorLog);

  const [formData, setFormData] = useState<loginProp>({
    email: "",
    password: "",
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      const { email, password } = formData;

      const emailIsEmpty = !email.trim();
      const passwordIsEmpty = !password.trim();

      setErrors({
        email: emailIsEmpty,
        password: passwordIsEmpty,
      });

      return;
    }

    dispatch(userLogin(formData));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const btnText = loading ? "Loading..." : "Log In";

  const disableBtn =
    errors.email ||
    errors.password ||
    Boolean(errorLog.password) ||
    Boolean(errorLog.email) ||
    loading;

  useEffect(() => {
    console.log("errorLog?.email?.length! > 0", errorLog?.email?.length! > 0);
    if (errorLog.password?.length! > 0 || errorLog.email?.length! > 0) {
      setErrors({
        email: errorLog?.email?.length! > 0,
        password: errorLog?.password?.length! > 0,
      });
    }
  }, [errorLog.password?.length! > 0, errorLog.email?.length! > 0]);

  return (
    <Form onSubmit={onSubmit}>
      <div className={styles.loginForm}>
        <FormField
          onChange={onChange}
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          autoComplete="email"
          errorMessage={errorLog.email || "Please fill email  field"}
          showError={errors.email}
        />
        <FormField
          onChange={onChange}
          label="Password"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          errorMessage={errorLog.password || "Please fill password  field"}
          showError={errors.password}
        />

        <Button
          disabled={disableBtn}
          type="submit"
          variant="primary"
          size="small"
        >
          {btnText}
        </Button>
      </div>
    </Form>
  );
};

export default Login;
