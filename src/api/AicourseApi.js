import { APIService } from "./axios";

/**
 * AI 코스 생성 요청
 * @param {Object} formData - { region, people, startDate, endDate, pace }
 * @returns {Promise<Object>} - 응답 데이터
 */
export const generateAiCourse = async (formData) => {
  return await APIService.private.post("/api/plans/generate", formData);
};
