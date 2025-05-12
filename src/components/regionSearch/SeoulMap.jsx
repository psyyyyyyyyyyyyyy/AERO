import styles from "./seoulmap.module.css";

export default function SeoulMap() {
  return (
    <div className={styles.mapContainer}>
      <img src="/images/seoul-map.png" alt="서울 지도" className={styles.map} />
    </div>
  );
}