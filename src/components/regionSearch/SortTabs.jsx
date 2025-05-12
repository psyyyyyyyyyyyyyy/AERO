import { useState } from "react";
import styles from "./sorttabs.module.css";

export default function SortTabs() {
  const [active, setActive] = useState("인기순");

  const toggleSort = () => {
    setActive((prev) => (prev === "최신순" ? "인기순" : "최신순"));
  };

  return (
    <div className={styles.container}>
      <button className={`${styles.tab} ${styles.active}`} onClick={toggleSort}>
        {active}
      </button>
    </div>
  );
}