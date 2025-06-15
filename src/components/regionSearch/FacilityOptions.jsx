import { useState, useEffect } from "react";
import styles from "./facilityoptions.module.css";

const options = [
  { label: "접근로 가능", value: "publictransport" },
  { label: "엘리베이터", value: "elevator" },
  { label: "휠체어 대여 가능", value: "wheelchair" },
  { label: "안내요원", value: "guidehuman" },
  { label: "장애인 화장실", value: "restroom" },
  { label: "장애인 주차장", value: "parking" },
  { label: "장애인용 객실", value: "room" },
];

export default function FacilityOptions({ visible, selected = [], onChange }) {
  const isAllSelected = selected.length === options.length;

  const toggleOption = (opt) => {
    const newSelected = selected.includes(opt)
      ? selected.filter((o) => o !== opt)
      : [...selected, opt];
    onChange(newSelected);
  };

  return (
    <div className={`${styles.options} ${visible ? styles.show : ""}`}>
      <div className={styles.btnRow}>
        {options.map((opt) => (
          <button
            key={opt.value}
            className={`${styles.optionBtn} ${selected.includes(opt.value) ? styles.selected : ""}`}
            onClick={() => toggleOption(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}