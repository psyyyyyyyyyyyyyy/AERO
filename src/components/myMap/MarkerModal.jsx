import styles from "./markerModal.module.css";

export default function MarkerModal({ onClose, markerData }) {
  return (
    <div className={styles.cardModal}>
      <img
        src={markerData.image}
        alt="preview"
        className={styles.cardImage}
      />
      <p className={styles.cardText}>{markerData.text}</p>
      <button className={styles.closeBtn} onClick={onClose}>
        ×
      </button>
    </div>
  );
}
