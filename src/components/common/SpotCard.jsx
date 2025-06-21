import styles from "./spotCard.module.css";
import defaultImage from "../../assets/images/관광지1.png";

export default function SpotCard({ image, title, location, onClick }) {
  const backgroundImage = image ? `url(${image})` : `url(${defaultImage})`;

  return (
    <div className={styles.card} onClick={onClick}>
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
