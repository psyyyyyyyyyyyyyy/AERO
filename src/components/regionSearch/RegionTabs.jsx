import styles from "./regiontabs.module.css";

const regions = [
  { name: "서울", code: "1" },
  { name: "강원", code: "32" },
  { name: "충북", code: "33" },
  { name: "충남", code: "34" },
  { name: "광주", code: "5" },
  { name: "부산", code: "6" },
  { name: "경기", code: "31" },
  { name: "경북", code: "35" },
  { name: "경남", code: "36" },
  { name: "전북", code: "37" },
  { name: "전남", code: "38" },
  { name: "울산", code: "7" },
  { name: "대전", code: "3" },
  { name: "대구", code: "4" },
  { name: "세종", code: "8" },
  { name: "인천", code: "2" },
  { name: "제주", code: "39" },
];

export default function RegionTabs({ selectedRegion, onSelect }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabContainer}>
        {regions.map((region) => (
          <button
            key={region.code}
            onClick={() => onSelect(region)}
            className={`${styles.tab} ${
              region.name === selectedRegion.name ? styles.active : ""
            }`}
          >
            {region.name}
          </button>
        ))}
      </div>
      <div className={styles.gradient} />
    </div>
  );
}
