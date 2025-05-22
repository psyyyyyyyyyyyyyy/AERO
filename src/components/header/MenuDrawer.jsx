import { useNavigate } from "react-router-dom";
import styles from "./menuDrawer.module.css";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import AERO from "../../assets/images/AERO4.png";

export default function MenuDrawer({ onClose }) {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);

  // 닫기 애니메이션 실행 후 완전 제거
  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300); // 애니메이션 시간과 일치
  };

  const handleMove = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.fadeOut : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.drawer} ${closing ? styles.slideOut : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className={styles.topBar}>
            <FiX className={styles.closeBtn} onClick={handleClose} />
          </div>
          <img src={AERO} className={styles.logo} />
          <ul className={styles.menuList}>
            <li onClick={() => handleMove("/search")}>관광지 검색 🧳</li>
            <li onClick={() => handleMove("/course")}>코스 전체보기 🏔️</li>
            <li onClick={() => handleMove("/schedule")}>여행 일정 📅</li>
            <li onClick={() => handleMove("/wishlist")}>관심 여행지 💙</li>
            <li onClick={() => handleMove("/mymap")}>My Travel Map 🗺️</li>
          </ul>
        </div>

        <div>
          <hr className={styles.line} />
          <ul className={styles.accountList}>
            <li onClick={() => handleMove("/account")}>Account</li>
            <li onClick={() => handleMove("/logout")}>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
