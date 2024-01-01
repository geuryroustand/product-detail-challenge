import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./LoginForm.module.scss";
import Form from "../../components/Form/Form";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { clearStore, userLogin } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

type loginProp = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, errorLog } = useSelector((state: RootState) => state.user);

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState<loginProp>({
    email: "",
    password: "",
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

    dispatch(userLogin(formData)).then((resultAction) => {
      if (userLogin.fulfilled.match(resultAction)) {
        navigate("/");
      }
    });
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

    if (errorLog.email || errorLog.password) {
      dispatch(clearStore());
    }
  };

  const btnText = loading ? "Loading..." : "Log In";

  const disableBtn =
    errors.email ||
    errors.password ||
    Boolean(errorLog.password) ||
    Boolean(errorLog.email) ||
    loading;

  useEffect(() => {
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
