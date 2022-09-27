import Image from "next/image";
import styles from "./style.module.css";

const getRandColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

interface Props {
  image: string;
}

function Fancy({ image }: Props): JSX.Element {
  return (
    <div className={styles.root}>
      <div className={styles.dots}>
        {Array.from(Array(2000)).map((x, i) => (
          <div
            key={i}
            style={{
              backgroundColor: getRandColor(),
            }}
          />
        ))}
      </div>
      <div className={styles.imageBox}>
        <Image src={image} alt="hehe" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
}

export default Fancy;
