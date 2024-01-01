import React, { FormEvent, useEffect, useState } from "react";

import FormField from "../../components/FormField/FormField";
import styles from "./SignUpForm.module.scss";
import Button from "../../components/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { clearStore, userSignup } from "../../store/userSlice";
import { AppDispatch, RootState } from "../../store/store";
import Form from "../../components/Form/Form";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    loading,

    error: apiError,
    errors: apiErrors,
  } = useSelector((state: RootState) => state.user);

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const signUpForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      const { username, email, password } = formData;

      const usernameIsEmpty = !username.trim();
      const emailIsEmpty = !email.trim();
      const passwordIsEmpty = !password.trim();

      setErrors({
        username: usernameIsEmpty,
        email: emailIsEmpty,
        password: passwordIsEmpty || !apiErrors?.password!.trim(),
      });

      return;
    }

    dispatch(userSignup(formData)).then((resultAction) => {
      if (userSignup.fulfilled.match(resultAction)) {
        navigate("/");
      }
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (apiError) {
      dispatch(clearStore());
    }

    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const btnText = loading ? "Loading..." : "Sign Up";

  const disableBtn =
    errors.email ||
    errors.password ||
    errors.username ||
    Boolean(apiError) ||
    loading;

  useEffect(() => {
    const showError =
      apiErrors?.password?.length! > 0 ||
      apiErrors?.username?.length! > 0 ||
      apiErrors?.email?.length! > 0 ||
      apiError;

    if (showError) {
      setErrors({
        username: apiErrors?.username?.length! > 0,
        email: apiErrors?.email?.length! > 0 || apiError?.length! > 0,
        password: apiErrors?.password?.length! > 0,
      });
    }
  }, [
    apiErrors?.password?.length! > 0,
    apiErrors?.username?.length! > 0,
    apiErrors?.email?.length! > 0,
    apiError,
  ]);

  return (
    <Form onSubmit={signUpForm}>
      <div className={styles.signupForm}>
        <FormField
          onChange={onChange}
          label="Username"
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          autoComplete="username"
          errorMessage={apiErrors?.username || "Please fill username  field"}
          showError={errors.username}
        />

        <FormField
          onChange={onChange}
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          autoComplete="email"
          errorMessage={
            apiErrors?.email || apiError || "Please fill email  field"
          }
          showError={errors.email}
        />
        <FormField
          onChange={onChange}
          label="Password"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          autoComplete="new-password"
          errorMessage={apiErrors?.password || "Please fill password  field"}
          showError={errors.password}
        />

        <Button
          disabled={disableBtn}
          variant="primary"
          size="small"
          type="submit"
        >
          {btnText}
        </Button>
      </div>
    </Form>
  );
};

export default SignUp;
