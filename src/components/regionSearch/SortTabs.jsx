import styles from "./sortTabs.module.css";
import { FiChevronDown } from "react-icons/fi";

export default function SortTabs({ current, onSelect }) {
  const toggleSortOrder = () => {
    const nextSort = current === "like" ? "recent" : "like";
    onSelect(nextSort);
  };

  const sortLabel = current === "like" ? "인기순" : "최신순";

  return (
    <div className={styles.container}>
      <button className={styles.sortBtn} onClick={toggleSortOrder}>
        {sortLabel}
        <FiChevronDown className={styles.icon} />
      </button>
    </div>
  );
}