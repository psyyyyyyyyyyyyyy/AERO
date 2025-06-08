import { useState } from "react";
import styles from "./sortTabs.module.css";
import { FiChevronDown } from "react-icons/fi";

export default function SortTabs() {
  const [sortOrder, setSortOrder] = useState("최신순");

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "최신순" ? "인기순" : "최신순"));
  };

  return (
    <div className={styles.container}>
    <button className={styles.sortBtn} onClick={toggleSortOrder}>
            {sortOrder}
            <FiChevronDown className={styles.icon} />
          </button>
    </div>
  );
}