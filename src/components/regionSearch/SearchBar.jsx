import { FiSearch } from "react-icons/fi";
import styles from "./searchbar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>📖 관광지 전체보기</h2>
      {/* <div className={styles.inputWrapper}>
        <input className={styles.input} placeholder="관광지명 입력" />
        <FiSearch className={styles.icon} />
      </div> */}
    </div>
  );
}
