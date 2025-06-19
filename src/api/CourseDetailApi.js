import { APIService } from "./axios";

/**
 * 토큰 유무에 따라 APIService.private 또는 APIService.public 사용
 */
const getApiClient = () => {
  const token = localStorage.getItem("accessToken");
  return token ? APIService.private : APIService.public;
};

/**
 * AI 코스 상세 조회
 * GET /api/plans/{id}
 */
export const fetchAiCourseDetail = async (id) => {
  try {
    const client = getApiClient();
    const res = await client.get(`/api/plans/${id}`);
    return res;
  } catch (error) {
    console.error("AI 코스 조회 실패:", error);
    throw error;
  }
};

/**
 * 유저 코스 상세 조회
 * GET /api/courses/{id}
 */
export const fetchUserCourseDetail = async (courseId) => {
  try {
    const client = getApiClient();
    const res = await client.get(`/api/courses/${courseId}`);
    return res;
  } catch (error) {
    console.error("유저 코스 조회 실패:", error);
    throw error;
  }
};

