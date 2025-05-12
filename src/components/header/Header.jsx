import { useLocation, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { FiHome, FiMenu, FiArrowLeft } from "react-icons/fi";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  return (
    <header className={styles.header}>
      {isHome ? (
        <button className={styles.recommendBtn}>AI 맞춤 여행지 추천</button>
      ) : (
        <FiArrowLeft
          className={styles.icon}
          onClick={() => navigate(-1)}
          title="뒤로가기"
        />
      )}
      <div className={styles.iconGroup}>
        <FiHome
          className={styles.icon}
          onClick={() => navigate("/")}
          title="홈으로"
        />
        <FiMenu className={styles.icon} title="메뉴" />
      </div>
    </header>
  );
}
