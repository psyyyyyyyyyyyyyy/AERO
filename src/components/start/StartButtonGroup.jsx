import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./startButtonGroup.module.css";
import { loginWithKakao } from "../../api/LoginApi";

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY; // 보통 .env에서 관리

export default function StartButtonGroup() {
  const navigate = useNavigate();

  useEffect(() => {
    // SDK 초기화 (한 번만 실행)
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
      console.log("✅ Kakao SDK Initialized");
    }
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      scope: "profile_nickname, account_email",
      success: async function (authObj) {
        console.log("카카오 로그인 성공", authObj);
        try {
          const data = await loginWithKakao(authObj.access_token);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          navigate("/");
        } catch (err) {
          console.error("백엔드 로그인 실패", err);
        }
      },
      fail: function (err) {
        console.error("카카오 로그인 실패", err);
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnGroup}>
        <button className={styles.kakao} onClick={handleKakaoLogin}>
          카카오로 계속하기
        </button>
        <button className={styles.naver}>구글로 계속하기</button>
      </div>
      <button className={styles.skip} onClick={() => navigate("/")}>
        Skip for now
      </button>
    </div>
  );
}
