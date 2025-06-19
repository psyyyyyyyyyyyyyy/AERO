import { APIService } from "./axios";

// 내가 만든 코스 불러오기 (인증 필요)
// 기본값은 ai
export const fetchUserCourses = async (type = "ai") => {
  const res = await APIService.private.get(`/api/courses/users/courses?type=${type}`);
  return res;
};

// 내가 좋아요한 코스 전체 조회 (AI + USER), 정렬 기준 포함
export const fetchLikedCourses = async (sortBy = "like") => {
  const res = await APIService.private.get(`/api/courses/users/likes/all?sortBy=${sortBy}`);
  return res;
};

// 내가 좋아요한 관광지 전체 조회 
export const fetchLikedTourSpots = async () => {
  const res = await APIService.private.get(`/api/tourspots/likes/my`);
  return res;
}