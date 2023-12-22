import styles from "./Title.module.scss";

type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return <h1 className={styles.heading}>{title}</h1>;
};

export default Title;
