import styles from "./style.module.css";

interface Props {
  label: string;
}

function Button({ label }: Props): JSX.Element {
  return <button className={styles.root}>{label}</button>;
}

export default Button;
