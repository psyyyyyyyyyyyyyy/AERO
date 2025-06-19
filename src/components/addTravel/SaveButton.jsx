import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 추가
import styles from "./saveButton.module.css";
import DetailModal from "./DetailModal";

export default function SaveButton({ onSave, selectedDay }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    await onSave();          // 먼저 저장 실행 (비동기 가능성 고려)
    navigate("/mypage");     // 저장 완료 후 /mypage 이동
  };

  return (
    <>
      <button className={styles.detail} onClick={() => setShowModal(true)}>
        + 상세 일정
      </button>
      <button className={styles.save} onClick={handleSave}>
        save
      </button>
      {showModal && (
        <DetailModal
          selectedDay={selectedDay}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
