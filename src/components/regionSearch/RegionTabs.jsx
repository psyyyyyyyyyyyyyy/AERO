import styles from "./regionTabs.module.css";

const regions = [
  "서울", "부산", "대전", "대구", "광주", "울산",
  "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"
];

export default function RegionTabs({ selectedRegion, onSelect }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabContainer}>
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => onSelect(region)}
            className={`${styles.tab} ${region === selectedRegion ? styles.active : ""}`}
          >
            {region}
          </button>
        ))}
      </div>
      <div className={styles.gradient} />
    </div>
  );
}
