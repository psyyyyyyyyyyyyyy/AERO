import styles from "./dayTabs.module.css";

export default function DayTabs({ totalDays = 3, selectedDay, onSelectDay }) {
  return (
    <div className={styles.tabWrapper}>
      {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
        <button
          key={day}
          className={`${styles.tab} ${selectedDay === day ? styles.active : ""}`}
          onClick={() => onSelectDay(day)}
        >
          Day {day}
        </button>
      ))}
    </div>
  );
}
