import { useState, useEffect } from "react";
import styles from "./sortTabs.module.css";
import { FiChevronDown } from "react-icons/fi";

export default function SortTabs({ current, onSelect, selectedType, onTypeChange }) {
  const [sortOrder, setSortOrder] = useState(current || "like");
  const [activeTab, setActiveTab] = useState(selectedType || "ai");

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "like" ? "recent" : "like";
    setSortOrder(newOrder);
    onSelect(newOrder);
  };
  const tabs = ["ai", "user"];

  useEffect(() => {
    onTypeChange(activeTab);
  }, [activeTab]);

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
      <button className={styles.sortBtn} onClick={toggleSortOrder}>
        {sortOrder === "like" ? "인기순" : "최신순"}
        <FiChevronDown className={styles.icon} />
      </button>
    </div>
  );
}
