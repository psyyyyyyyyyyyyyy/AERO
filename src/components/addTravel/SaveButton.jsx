import { useState } from "react";
import styles from "./saveButton.module.css";
import DetailModal from "./DetailModal";

export default function SaveButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.detail} onClick={() => setShowModal(true)}>
        + 상세 일정
      </button>
      <button className={styles.save}>save</button>
      {showModal && <DetailModal onClose={() => setShowModal(false)} />}
    </>
  );
}
