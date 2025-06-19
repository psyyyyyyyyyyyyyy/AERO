import { useLocation, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { FiHome, FiMenu, FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import MenuDrawer from "./MenuDrawer";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === "/";

  const isCourseDetail =
    location.pathname.startsWith("/courses/ai") ||
    location.pathname.startsWith("/courses/user");

  const isAiCoursePage = location.pathname === "/aicourse";

  return (
    <>
      <header
        className={`${styles.header} ${
          isCourseDetail ? styles.whiteIcons : ""
        }`}
      >
        {isHome ? (
          <button
            className={styles.recommendBtn}
            onClick={() => navigate("/aicourse")}
          >
            AI 맞춤 여행지 추천
          </button>
        ) : (
          <FiArrowLeft
            className={`${styles.icon} ${
              isCourseDetail ? styles.whiteIcons : ""
            }`}
            onClick={() => navigate(-1)}
            title="뒤로가기"
          />
        )}

        {isAiCoursePage && (
          <span className={styles.centerText}>AI 맞춤 여행지 추천</span>
        )}

        <div className={styles.iconGroup}>
          <FiHome
            className={`${styles.icon} ${
              isCourseDetail ? styles.whiteIcons : ""
            }`}
            onClick={() => navigate("/")}
            title="홈으로"
          />
          <FiMenu
            className={`${styles.icon} ${
              isCourseDetail ? styles.whiteIcons : ""
            }`}
            title="메뉴"
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </header>
      {menuOpen && <MenuDrawer onClose={() => setMenuOpen(false)} />}
    </>
  );
}
