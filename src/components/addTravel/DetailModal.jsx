import styles from "./detailModal.module.css";
import { useScheduleStore } from "../../stores/useScheduleStore";

export default function DetailModal({ onClose }) {
  const places = useScheduleStore((state) => state.places);
  const details = useScheduleStore((state) => state.details);
  const setDetail = useScheduleStore((state) => state.setDetail);

  const handleSave = () => {
    console.log("Saved details:", details);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>상세 일정 추가</h3>
        <div className={styles.scrollArea}>
          {places.map((place, idx) => (
            <div key={idx} className={styles.block}>
              <input
                type="text"
                placeholder="시간 예: PM 2:00"
                value={details[idx]?.time || ""}
                onChange={(e) => setDetail(idx, "time", e.target.value)}
                className={styles.input}
              />
              <input
                type="text"
                value={place}
                readOnly
                className={`${styles.input} ${styles.readonly}`}
              />
              <textarea
                placeholder="세부 설명"
                value={details[idx]?.description || ""}
                onChange={(e) => setDetail(idx, "description", e.target.value)}
                className={styles.textarea}
              />
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            취소
          </button>
          <button className={styles.saveBtn} onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
