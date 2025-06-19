import { APIService } from "./axios";

/**
 * 여행 계획을 서버에 저장하는 API
 * @param {object} courseData - 여행 코스 요청 바디
 */
export async function postTravelCourse(courseData) {
  try {
    const response = await APIService.private.post("/api/courses", courseData);
    return response;
  } catch (error) {
    console.error("여행 코스 저장 실패:", error);
    throw error;
  }
}
