import styles from "./wishlistTabs.module.css";

export default function WishlistTabs({ mode, userAiTab, setUserAiTab }) {
  const isLikeMode = mode === "like";

  return (
    <div className={styles.container}>
      <div className={styles.tabWrapper}>
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${userAiTab === "ai" ? styles.active : ""}`}
            onClick={() => setUserAiTab("ai")}
          >
            {isLikeMode ? "관광지" : "AI"}
          </button>
          <button
            className={`${styles.tab} ${userAiTab === "user" ? styles.active : ""}`}
            onClick={() => setUserAiTab("user")}
          >
            {isLikeMode ? "코스" : "USER"}
          </button>
        </div>
      </div>
    </div>
  );
}


