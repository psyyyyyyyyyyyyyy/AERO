import styles from "./topBackground.module.css";
import logoImg from "../../assets/images/bagImg.png";

export default function TopBackground() {
  return (
    <div className={styles.topBackground}>
      <div className={styles.logoWrap}>
        <img src={logoImg} alt="suitcase" className={styles.logo} />
      </div>
    </div>
  );
}
