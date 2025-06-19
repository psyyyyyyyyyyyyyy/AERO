import { APIService } from "./axios";

export const searchTourSpots = async (keyword) => {
  try {
    const response = await APIService.public.get("/api/tourspots/search", {
      params: { keyword, sortBy: "likes" },
    });
    return response;
  } catch (error) {
    console.error("관광지 검색 실패:", error);
    return [];
  }
};
