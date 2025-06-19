import styles from "./facilitytoggle.module.css";

export default function FacilityToggle({ onClick, active, onToggleAll, isAllSelected }) {
  return (
    <div className={styles.wrapper}>
      <button className={styles.toggleBtn} onClick={onClick}>
        + 관광약자 편의 시설 선택
      </button>
      <button className={styles.selectAll} onClick={onToggleAll}>
        {isAllSelected ? "전체 해제" : "전체선택"}
      </button>
    </div>
  );
}
