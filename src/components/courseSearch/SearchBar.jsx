import { FiSearch } from "react-icons/fi";
import styles from "./searchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>⛰️ 코스 전체 보기</h2>
      <div className={styles.inputWrapper}>
        <input className={styles.input} placeholder="테마 또는 지역 입력" />
        <FiSearch className={styles.icon} />
      </div>
    </div>
  );
}
