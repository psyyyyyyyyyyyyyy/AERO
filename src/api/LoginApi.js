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
 * @param {string} accessToken - 구글에서 받은 액세스 토큰
 */
export const loginWithGoogle = async (accessToken) => {
  return await APIService.public.post("/api/auth/google", { accessToken });
};

// 로그아웃 요청 (토큰 필요)
export async function logoutUser() {
  try {
    const response = await APIService.private.post("/api/auth/logout");
    return response; // 성공 시 response 반환
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw error;
  }
}

// 회원 탈퇴 요청 (토큰 필요)
export async function withdrawUser() {
  try {
    const response = await APIService.private.delete("/api/auth/withdraw");
    return response;
  } catch (error) {
    console.error("회원 탈퇴 실패:", error);
    throw error;
  }
}


