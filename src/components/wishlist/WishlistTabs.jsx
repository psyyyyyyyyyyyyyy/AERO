import { useState } from "react";
import styles from "./wishlistTabs.module.css";
import { FiChevronDown } from "react-icons/fi";

export default function WishlistTabs() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("최신순");

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "최신순" ? "인기순" : "최신순"));
  };

  const tabs = ["ALL", "관심 여행지", "내 코스"];

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${
              activeTab === tab ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <button className={styles.sortBtn} onClick={toggleSortOrder}>
        {sortOrder}
        <FiChevronDown className={styles.icon} />
      </button>
    </div>
  );
}
