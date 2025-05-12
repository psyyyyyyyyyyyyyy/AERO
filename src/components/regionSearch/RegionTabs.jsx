import styles from "./regionTabs.module.css";

const regions = [
  "전국", "서울", "부산", "제주", "대전", "대구", "광주", "울산",
  "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"
];

export default function RegionTabs() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabContainer}>
        {regions.map((region, index) => (
          <button
            key={region}
            className={`${styles.tab} ${index === 1 ? styles.active : ""}`}
          >
            {region}
          </button>
        ))}
      </div>
      <div className={styles.gradient} />
    </div>
  );
}