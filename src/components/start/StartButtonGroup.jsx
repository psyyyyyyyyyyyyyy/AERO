import { useNavigate } from "react-router-dom";
import styles from "./startButtonGroup.module.css";

export default function StartButtonGroup() {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnGroup}>
        <button className={styles.kakao}>카카오로 계속하기</button>
        <button className={styles.naver}>네이버로 계속하기</button>
      </div>
      <button className={styles.skip} onClick={() => navigate("/")}>
        Skip for now
      </button>
    </div>
  );
}
