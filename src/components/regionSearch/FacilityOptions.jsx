import styles from "./facilityoptions.module.css";

const options = [
  "경사로",
  "장애인 엘리베이터",
  "휠체어/유아차 대여 가능",
  "휠체어 접근 가능 매표소",
  "장애인 화장실",
  "장애인 주차장"
];

export default function FacilityOptions({ visible }) {
  return (
    <div className={`${styles.options} ${visible ? styles.show : ""}`}>
      {options.map((opt, i) => (
        <button key={i} className={styles.optionBtn}>
          {opt}
        </button>
      ))}
      <button className={styles.searchBtn}>조회하기</button>
    </div>
  );
}