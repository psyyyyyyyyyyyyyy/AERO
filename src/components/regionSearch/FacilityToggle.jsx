import styles from "./facilityToggle.module.css";

export default function FacilityToggle({ onClick, active }) {
  return (
    <div className={styles.wrapper}>
      <button className={styles.toggleBtn} onClick={onClick}>
        + 관광약자 편의 시설 선택
      </button>
      <button className={styles.selectAll}>전체선택</button>
    </div>
  );
}