import { useEffect, useState } from "react";
import styles from "./dateSelector.module.css";

export default function DateSelector({ start, end, onChange }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (start && end && new Date(start) > new Date(end)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [start, end]);

  return (
    <div className={styles.container}>
      <p className={styles.question}>📅 일정 시작, 종료 날짜를 골라주세요!</p>
      <div className={styles.dateInputs}>
        <input
          className={`${styles.inputStyle} ${error ? styles.errorInput : ""}`}
          type="date"
          value={start}
          onChange={(e) => onChange(e.target.value, end)}
        />
        <span className={styles.to}>~</span>
        <input
          className={`${styles.inputStyle} ${error ? styles.errorInput : ""}`}
          type="date"
          value={end}
          onChange={(e) => onChange(start, e.target.value)}
        />
      </div>
      {error && <p className={styles.errorText}>⚠ 시작 날짜보다 종료 날짜가 뒤에 있어야 합니다.</p>}
    </div>
  );
}
