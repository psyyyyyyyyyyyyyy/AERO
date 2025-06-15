import { APIService } from "./axios";

/**
 * 관광지 필터링 조회 API
 */
export const fetchTourSpots = async ({
  areaCode,
  sigunguCode,
  facilityFilters,
  themeFilters,
  page = 0,
  size = 10,
  sortBy = "like", // 기본 좋아요순
}) => {
  const params = {
    areaCode,
    sigunguCode,
    facilityFilters,
    themeFilters,
    page,
    size,
    sortBy,
  };

  return await APIService.public.get("/api/tourspots/filter", { params });
};
