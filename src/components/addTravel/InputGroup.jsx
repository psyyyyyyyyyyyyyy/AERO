import styles from "./inputGroup.module.css";
import ThemeToggle from "./ThemeToggle";
import PeopleToggle from "./PeopleToggle";

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
          className={styles.input}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className={styles.input}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <PeopleToggle selected={people} setSelected={setPeople} />
      </div>
    </div>
  );
}
