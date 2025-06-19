import styles from "./regionSelector.module.css";

const regions = ["서울", "부산", "인천", "제주", "대전", "대구", "광주", "울산", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남"];

export default function RegionSelector({ value, onChange }) {
  return (
    <div className={styles.container}>
      <p className={styles.question}>📍 어디로 떠나시나요?</p>
      <div className={styles.options}>
        {regions.map((region) => (
          <button
            key={region}
            className={`${styles.option} ${value === region ? styles.active : ""}`}
            onClick={() => onChange(region)}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
}
