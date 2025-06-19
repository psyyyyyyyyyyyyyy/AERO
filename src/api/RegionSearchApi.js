import { APIService } from "./axios";

/**
 * 관광지 필터링 조회 API (토큰 유무에 따라 private/public 사용)
 */
export const fetchTourSpots = async ({
  areaCode,
  sigunguCode,
  facilityFilters,
  themeFilters,
  page = 0,
  size = 10,
  sortBy = "like",
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

  const token = localStorage.getItem("accessToken");
  const client = token ? APIService.private : APIService.public;

  return await client.get("/api/tourspots/filter", { params });
};
