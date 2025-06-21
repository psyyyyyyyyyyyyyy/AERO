import styles from "./spotCard.module.css";
import defaultImage from "../../assets/images/관광지1.png"; // 기본 이미지 추가 (직접 있는 경로로 수정)

export default function SpotCard({ image, title, location }) {
  const backgroundImage = image ? `url(${image})` : `url(${defaultImage})`;

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage }}
      ></div>
      <div className={styles.description}>
        <p className={styles.name}>{title}</p>
        <p className={styles.location}>{location}</p>
      </div>
    </div>
  );
}
