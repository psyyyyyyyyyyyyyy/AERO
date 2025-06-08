import styles from "./tourCardList.module.css";

export default function TourCardList() {
  return (
    <div className={styles.grid}>
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className={styles.card}></div>
      ))}
    </div>
  );
}
