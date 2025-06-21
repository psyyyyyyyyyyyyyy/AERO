import styles from "./detailModal.module.css";
import { useScheduleStore } from "../../stores/useScheduleStore";

export default function DetailModal({ selectedDay, onClose }) {
const allSchedules = useScheduleStore((state) => state.schedulesByDay);
const allDetails = useScheduleStore((state) => state.detailsByDay);

  // value가 없는(=입력되지 않은) 관광지는 필터링
  const places = (allSchedules[selectedDay] || []).filter((p) => p.value);
  const details = (allDetails[selectedDay] || []).slice(0, places.length);
  
  const setDetail = useScheduleStore((state) => state.setDetailForDay);

  const handleChange = (index, key, value) => {
    setDetail(selectedDay, index, key, value);
  };

  const handleClose = () => {
    onClose(); // 저장은 Zustand에 이미 반영되어 있으므로 그냥 닫기만
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>상세 일정 추가 - Day {selectedDay}</h3>
        <div className={styles.scrollArea}>
          {places.map((place, index) => (
            <div key={index} className={styles.block}>
              {/* <input
                type="text"
                placeholder="시간 예: PM 2:00"
                value={details[index]?.time || ""}
                onChange={(e) => handleChange(index, "time", e.target.value)}
                className={styles.input}
              /> */}
              <input
                type="text"
                value={place.value || ""}
                readOnly
                className={`${styles.input} ${styles.readonly}`}
              />
              <textarea
                placeholder="세부 설명"
                value={details[index]?.description || ""}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                className={styles.textarea}
              />
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={handleClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
