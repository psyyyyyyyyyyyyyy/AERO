import { APIService } from "./axios";

// 내가 만든 코스 불러오기 (인증 필요)
// 기본값은 ai
export const fetchUserCourses = async (type = "ai", page = 0, size = 10) => {
  const res = await APIService.private.get(
    `/api/courses/users/courses?type=${type}&page=${page}&size=${size}`
  );
  return res;
};


// 내가 좋아요한 코스 전체 조회 (AI + USER), 정렬 기준 포함
export const fetchLikedCourses = async (sortBy = "like", page = 0, size = 10) => {
  const res = await APIService.private.get(
    `/api/courses/users/likes/all?sortBy=${sortBy}&page=${page}&size=${size}`
  );
  return res;
};


// 내가 좋아요한 관광지 전체 조회 
export const fetchLikedTourSpots = async (page = 0, size = 10) => {
  const res = await APIService.private.get(
    `/api/tourspots/likes/my?page=${page}&size=${size}`
  );
  return res;
};


//유저 코스 삭제
export const deleteUserCourse = async (courseId) => {
  return await APIService.private.delete(`/api/courses/${courseId}`);
};
