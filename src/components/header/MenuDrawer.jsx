import { useNavigate } from "react-router-dom";
import styles from "./menuDrawer.module.css";
import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import AERO from "../../assets/images/AERO4.png";
import { logoutUser, withdrawUser } from "../../api/LoginApi";
import WithdrawModal from "./WithdrawModal";

export default function MenuDrawer({ onClose }) {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // 토큰 여부 확인
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300); // 애니메이션 시간과 일치
  };

  const handleMove = (path) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); // API 요청
    } catch (e) {
      console.warn("로그아웃 API 실패. 강제 로그아웃 처리.");
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/start");
    handleClose();
  };

  const confirmWithdraw = async () => {
    try {
      await withdrawUser();
      alert("회원 탈퇴가 완료되었습니다.");
    } catch (err) {
      alert("회원 탈퇴에 실패했습니다.");
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setShowWithdrawModal(false);
    navigate("/start");
    handleClose();
  };

  return (
    <>
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
              <li onClick={() => handleMove("/spot")}>관광지 전체보기 🧳</li>
              <li onClick={() => handleMove("/course")}>코스 전체보기 🏔️</li>
              <li onClick={() => handleMove("/schedule")}>여행 일정생성 📅</li>
              <li onClick={() => handleMove("/mypage")}>나의 보관함 💙</li>
              <li onClick={() => handleMove("/mymap")}>My Travel Map 🗺️</li>
            </ul>
          </div>

          <div>
            <hr className={styles.line} />
            <ul className={styles.accountList}>
              {isLoggedIn ? (
                <>
                  <li onClick={handleLogout}>Logout</li>
                  <li onClick={() => setShowWithdrawModal(true)}>Withdraw</li>
                </>
              ) : (
                <li onClick={() => handleMove("/start")}>Login</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {showWithdrawModal && (
        <WithdrawModal
          onConfirm={confirmWithdraw}
          onCancel={() => setShowWithdrawModal(false)}
        />
      )}
    </>
  );
}
