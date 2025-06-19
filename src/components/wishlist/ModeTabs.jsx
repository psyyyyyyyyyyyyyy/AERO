import styles from "./modeTabs.module.css";

export default function ModeTabs({ mode, setMode }) {
  return (
    <div className={styles.modeTabs}>
      <button
        className={`${styles.tabButton} ${mode === "my" ? styles.active : ""}`}
        onClick={() => setMode("my")}
      >
        내가 만든 코스
      </button>
      <button
        className={`${styles.tabButton} ${mode === "like" ? styles.active : ""}`}
        onClick={() => setMode("like")}
      >
        좋아요
      </button>
    </div>
  );
}
