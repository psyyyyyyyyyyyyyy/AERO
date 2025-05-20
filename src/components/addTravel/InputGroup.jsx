import styles from "./inputGroup.module.css";
import ThemeToggle from "./ThemeToggle";

export default function InputGroup() {
  return (
    <div className={styles.group}>
      <input className={styles.input} placeholder="여행명" />
      <div className={styles.row}>
        <ThemeToggle />
      </div>
      <div className={styles.row}>
        <input className={styles.input} placeholder="출발일" />
        <input className={styles.input} placeholder="도착일" />
      </div>
      <div className={styles.row}>
        <input className={styles.input} placeholder="인원" />
        <input className={styles.input} placeholder="일 수" />
      </div>
    </div>
  );
}
