import { FiX } from "react-icons/fi";
import styles from "./wishlistCard.module.css";

export default function WishlistCard({ image, title, subtitle, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.textOverlay}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <button className={styles.closeBtn}>
        <FiX className={styles.closeIcon} />
      </button>
    </div>
  );
}
