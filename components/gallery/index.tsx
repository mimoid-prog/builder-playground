import { ReactNode } from "react";
import styles from "./style.module.css";

interface Props {
  children: ReactNode;
}

function Gallery({ children }: Props): JSX.Element {
  return (
    <div className={styles.root}>
      <div className={styles.gallery}>
        <div className={styles.div1} />
        <div className={styles.div2} />
        <div className={styles.div3} />
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
}

export default Gallery;
