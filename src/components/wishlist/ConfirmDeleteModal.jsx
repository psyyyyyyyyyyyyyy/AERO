import styles from "../../components/header/WithdrawModal.module.css";

export default function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>정말 삭제하시겠어요?</h2>
        <p className={styles.text}>삭제한 정보는 복구할 수 없습니다.</p>
        <div className={styles.buttons}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            취소
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
