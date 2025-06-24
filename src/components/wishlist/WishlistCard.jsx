import { useState } from "react";
import { FiX } from "react-icons/fi";
import styles from "./wishlistCard.module.css";
import { deleteUserCourse } from "../../api/WishlistApi";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function WishlistCard({
  image,
  title,
  subtitle,
  onClick,
  type,        // 'user' 또는 'ai'
  mode,        // 'my' 또는 'like'
  courseId,
  onDeleted,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteUserCourse(courseId);
      alert("삭제가 완료되었습니다.");
      setShowModal(false);
      onDeleted?.();
    } catch (error) {
      alert("삭제에 실패했습니다.");
    }
  };

  const showDeleteBtn = type === "user" && mode === "my";

  return (
    <>
      <div className={styles.card} onClick={onClick}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.textOverlay}>
          <p className={styles.title}>{title}</p>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {showDeleteBtn && (
          <button
            className={styles.closeBtn}
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            <FiX className={styles.closeIcon} />
          </button>
        )}
      </div>

      {showModal && (
        <ConfirmDeleteModal
          onCancel={() => setShowModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
