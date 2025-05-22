import { useRef, useState } from "react";
import { FiCamera, FiX } from "react-icons/fi";
import styles from "./editModal.module.css";

export default function EditModal({ onClose }) {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  return (
    <div className={styles.editModal}>
      <div className={styles.editHeader}>
        <h3>add 📌</h3>
        <button className={styles.closeBtn} onClick={onClose}>
          <FiX className={styles.closeIcon} />
        </button>
      </div>

      <input
        type="text"
        placeholder="주소를 입력해주세요."
        className={styles.input}
      />

      <div
        className={`${styles.uploadBox} ${!previewUrl ? styles.empty : ""}`}
        onClick={handleImageClick}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="preview" className={styles.previewImage} />
        ) : (
          <>
            <FiCamera className={styles.uploadIcon} />
            <span>이미지 업로드</span>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      <textarea
        placeholder="한줄 기록을 입력해주세요."
        className={styles.textarea}
      />
      <button className={styles.saveBtn}>save</button>
    </div>
  );
}
