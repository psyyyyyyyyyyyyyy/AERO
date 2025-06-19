import styles from "./inputGroup.module.css";
import ThemeToggle from "./ThemeToggle";
import PeopleToggle from "./PeopleToggle";
import { useEffect, useState } from "react";

export default function InputGroup({
  title,
  setTitle,
  theme,
  setTheme,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  people,
  setPeople,
}) {
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setDateError(true);
    } else {
      setDateError(false);
    }
  }, [startDate, endDate]);

  return (
    <div className={styles.group}>
      <input
        type="text"
        className={styles.input}
        placeholder="여행명"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className={styles.row}>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      <div className={styles.row}>
        <input
          type="date"
          className={`${styles.input} ${dateError ? styles.errorInput : ""}`}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className={`${styles.input} ${dateError ? styles.errorInput : ""}`}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {dateError && (
        <p className={styles.errorText}>⚠ 시작 날짜보다 종료 날짜가 뒤에 있어야 합니다.</p>
      )}

      <div className={styles.row}>
        <PeopleToggle selected={people} setSelected={setPeople} />
      </div>
    </div>
  );
}
