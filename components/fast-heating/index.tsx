import styles from "./style.module.css";

const FastHeating = () => {
  return (
    <div className={styles.root}>
      <div className={styles.topbar} />
      <div className={styles.bg}>
        <div className={styles.content}>
          <h2>Fast heating</h2>
          <p>
            Ploom X reaches the optimal temperature in moments. It only takes 25
            seconds from powering on, to first puff.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FastHeating;
