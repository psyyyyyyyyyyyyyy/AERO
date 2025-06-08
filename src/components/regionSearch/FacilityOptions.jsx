import { useState } from "react";
import styles from "./facilityOptions.module.css";

const options = [
  "경사로",
  "장애인 엘리베이터",
  "휠체어/유아차 대여 가능",
  "휠체어 접근 가능 매표소",
  "장애인 화장실",
  "장애인 주차장"
];

export default function FacilityOptions({ visible }) {
  const [selected, setSelected] = useState([]);

  const toggleOption = (opt) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  return (
    <div className={`${styles.options} ${visible ? styles.show : ""}`}>
      {options.map((opt, i) => (
        <button
          key={i}
          className={`${styles.optionBtn} ${selected.includes(opt) ? styles.selected : ""}`}
          onClick={() => toggleOption(opt)}
        >
          {opt}
        </button>
      ))}
      <button className={styles.searchBtn}>조회하기</button>
    </div>
  );
}