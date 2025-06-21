import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./saveButton.module.css";
import DetailModal from "./DetailModal";

export default function SaveButton({ onSave, selectedDay }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    const success = await onSave();
    if (success) {
      navigate("/mypage");
    }
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
