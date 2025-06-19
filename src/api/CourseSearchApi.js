import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_URL;

export async function fetchCourses(params) {
  try {
    const response = await axios.get(`${BASE_URL}/api/courses/all`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("코스 조회 실패:", error);
    throw error;
  }
}