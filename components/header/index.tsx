import styles from "./style.module.css";

interface Props {
  subtitle: string;
}

function Header({ subtitle }: Props): JSX.Element {
  return (
    <div className={styles.root}>
      <h1>Mateusz Szkop</h1>
      <h2>{subtitle}</h2>
    </div>
  );
}

export default Header;
