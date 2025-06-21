import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./startButtonGroup.module.css";
import { loginWithKakao, loginWithGoogle } from "../../api/LoginApi";
import Kakao from "../../assets/images/login/kakao.png";
import Google from "../../assets/images/login/google.png";

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function StartButtonGroup() {
  const navigate = useNavigate();

  useEffect(() => {
    // Kakao 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
    }

    // Google API 스크립트 삽입
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      scope: "profile_nickname, account_email",
      success: async (authObj) => {
        try {
          const data = await loginWithKakao(authObj.access_token);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          navigate("/");
        } catch (err) {
          console.error("백엔드 로그인 실패", err);
        }
      },
      fail: (err) => {
        console.error("카카오 로그인 실패", err);
      },
    });
  };

  const handleGoogleLogin = () => {
    if (!window.google || !GOOGLE_CLIENT_ID) return;

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: "profile email",
      callback: async (tokenResponse) => {
        const accessToken = tokenResponse.access_token;
        try {
          const data = await loginWithGoogle(accessToken);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          navigate("/");
        } catch (err) {
          console.error("구글 로그인 실패", err);
        }
      },
    });

    tokenClient.requestAccessToken();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnGroup}>
        <button className={styles.kakao} onClick={handleKakaoLogin}>
          <img src={Kakao} className={styles.icon} />
          카카오로 계속하기
        </button>
        <button className={styles.google} onClick={handleGoogleLogin}>
          <img src={Google} className={styles.icon} />
          구글로 계속하기
        </button>
      </div>
      <button className={styles.skip} onClick={() => navigate("/")}>
        Skip for now
      </button>
    </div>
  );
}
