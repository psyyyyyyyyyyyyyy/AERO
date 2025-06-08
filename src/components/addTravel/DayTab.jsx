import { useState } from "react";
import styles from "./dayTabs.module.css";

export default function DayTabs({ totalDays = 3 }) {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <div className={styles.tabWrapper}>
      {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => (
        <button
          key={day}
          className={`${styles.tab} ${activeDay === day ? styles.active : ""}`}
          onClick={() => setActiveDay(day)}
        >
          Day {day}
        </button>
      ))}
    </div>
  );
}