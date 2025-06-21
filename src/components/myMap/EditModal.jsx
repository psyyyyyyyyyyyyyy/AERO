import { useRef, useState } from "react";
import { FiCamera, FiX } from "react-icons/fi";
import styles from "./editModal.module.css";
import { uploadTravelLog } from "../../api/MyMapApi";

export default function EditModal({ onClose, onSaveSuccess }) {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
    }
  };

  const handleSave = async () => {
    // 유효성 검사
    if (!address.trim() || !file || !content.trim()) {
      alert("주소, 이미지, 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await uploadTravelLog({ address, content, file });
      alert("저장되었습니다.");
      onSaveSuccess(); // 저장 성공 후 부모에게 알림
      onClose(); // 모달 닫기
    } catch (e) {
      console.error(e);
      alert("사진의 용량이 너무 큽니다.");
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
        value={address}
        onChange={(e) => setAddress(e.target.value)}
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
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className={styles.saveBtn} onClick={handleSave}>
        save
      </button>
    </div>
  );
}
