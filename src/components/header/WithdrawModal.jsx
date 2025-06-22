import styles from "./WithdrawModal.module.css";

export default function WithdrawModal({ onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>정말 탈퇴하시겠어요?</h2>
        <p className={styles.text}>탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.</p>
        <div className={styles.buttons}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            취소
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
