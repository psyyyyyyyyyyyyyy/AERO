import styles from "./spotOverview.module.css";

export default function SpotOverview({ overview }) {
  return (
    <div className={styles.overview}>
      <h2>소개</h2>
      <p>{overview || "소개 정보가 없습니다."}</p>
    </div>
  );
}
