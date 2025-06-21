import styles from "./mainBanner.module.css";
import AERO from "../../assets/images/AERO.png";

export default function MainBanner() {
  return (
    <div className={styles.banner}>
      <img src={AERO} className={styles.logo} />
    </div>
  );
}
