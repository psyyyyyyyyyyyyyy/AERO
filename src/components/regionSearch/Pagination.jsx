import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./pagination.module.css";

export default function Pagination({ currentPage = 0, totalPages = 1, onChange }) {
  const [groupStart, setGroupStart] = useState(0); // 현재 보여줄 그룹의 시작 인덱스

  const groupSize = 5; // 한 번에 보여줄 페이지 수
  //const totalGroups = Math.ceil(totalPages / groupSize);

  useEffect(() => {
    // 현재 페이지에 따라 그룹 자동 이동
    const newStart = Math.floor(currentPage / groupSize) * groupSize;
    setGroupStart(newStart);
  }, [currentPage]);

  const pages = Array.from(
    { length: Math.min(groupSize, totalPages - groupStart) },
    (_, i) => groupStart + i
  );

  const handlePrevGroup = () => {
    if (groupStart - groupSize >= 0) {
      setGroupStart(groupStart - groupSize);
      onChange?.(groupStart - groupSize); // 첫 페이지로 이동
    }
  };

  const handleNextGroup = () => {
    if (groupStart + groupSize < totalPages) {
      setGroupStart(groupStart + groupSize);
      onChange?.(groupStart + groupSize); // 다음 그룹 첫 페이지로 이동
    }
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.arrowBtn} onClick={handlePrevGroup} disabled={groupStart === 0}>
        <FiChevronLeft />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onChange?.(page)}
          className={`${styles.pageBtn} ${page === currentPage ? styles.active : ""}`}
        >
          {page + 1}
        </button>
      ))}

      <button
        className={styles.arrowBtn}
        onClick={handleNextGroup}
        disabled={groupStart + groupSize >= totalPages}
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
