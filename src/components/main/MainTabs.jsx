import styles from "./mainTabs.module.css";

export default function MainTabs({ activeTab, onTabChange }) {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${activeTab === "관광지" ? styles.active : ""}`}
        onClick={() => onTabChange("관광지")}
      >
        관광지
      </button>
      <button
        className={`${styles.tab} ${activeTab === "코스" ? styles.active : ""}`}
        onClick={() => onTabChange("코스")}
      >
        코스
      </button>
    </div>
  );
}
