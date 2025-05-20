import styles from "./titleHeader.module.css";
import { FiPlus } from "react-icons/fi";

export default function TitleHeader() {
  return (
    <div className={styles.titleHeader}>
      <FiPlus />
      <span>여행 일정 추가</span>
    </div>
  );
}
