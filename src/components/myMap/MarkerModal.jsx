import { FiX, FiTrash2 } from "react-icons/fi";
import styles from "./markerModal.module.css";
import { deleteTravelLog } from "../../api/MymapApi";

export default function MarkerModal({ onClose, markerData, onDeleteSuccess }) {
  const handleDelete = async () => {
    try {
      await deleteTravelLog(markerData.id);
      onDeleteSuccess?.();
    } catch (error) {
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.cardModal}>
      <img src={markerData.image} alt="preview" className={styles.cardImage} />
      <p className={styles.cardText}>{markerData.text}</p>
      <div className={styles.buttonGroup}>
        <button className={styles.trashBtn} onClick={handleDelete}>
          <FiTrash2 className={styles.trashIcon} />
        </button>
        <button className={styles.closeBtn} onClick={onClose}>
          <FiX className={styles.closeIcon} />
        </button>
      </div>
    </div>
  );
}
