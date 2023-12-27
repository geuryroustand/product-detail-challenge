import { useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.scss";

interface CustomError {
  statusText?: string;
  message?: string;
}

const ErrorPage = () => {
  const error: CustomError = useRouteError() as CustomError;

  return (
    <div className={styles.wrapper} id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
