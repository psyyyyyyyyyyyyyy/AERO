import { APIService } from "./axios.js";

/**
 * 카카오 로그인 요청
 * @param {string} token - 카카오에서 받은 액세스 토큰
 */
export const loginWithKakao = async (accessToken) => {
  return await APIService.public.post("/api/auth/kakao", { accessToken });
};

/**
 * 구글 로그인 요청
 * @param {string} token - 구글에서 받은 액세스 토큰
 */
export const loginWithGoogle = async (accessToken) => {
  return await APIService.public.post("/api/auth/google", { accessToken });
};
