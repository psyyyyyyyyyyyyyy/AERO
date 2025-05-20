import styles from "./toggleButtons.module.css";
import { FiLock, FiUnlock } from "react-icons/fi";

export default function ToggleButtons() {
  return (
    <div className={styles.toggleContainer}>
      <div className={styles.buttonSection}>
        <FiUnlock className={styles.icon} />
        <button className={styles.active}>공개</button>
      </div>
      <div className={styles.buttonSection}>
        <FiLock className={styles.icon} />
        <button className={styles.inactive}>비공개</button>
      </div>
    </div>
  );
}
