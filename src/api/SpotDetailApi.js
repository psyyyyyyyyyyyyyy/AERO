import { APIService } from "./axios";

const BASE_DETAIL_URL = "https://apis.data.go.kr/B551011/KorWithService2/detailCommon2";
const BASE_INTRO_URL = "https://apis.data.go.kr/B551011/KorWithService2/detailIntro2";
const BASE_URL_BARRIER = "https://apis.data.go.kr/B551011/KorWithService2/detailWithTour2";

// 상세 정보 불러오기
export async function fetchSpotDetail(contentId) {
  const params = {
    MobileOS: "ETC",
    MobileApp: "AERO",
    contentId,
    _type: "json",
    serviceKey: import.meta.env.VITE_SPOT_API_KEY,
  };

  const response = await APIService.public.get(BASE_DETAIL_URL, { params });
  const item = response?.response?.body?.items?.item?.[0];

  if (!item) throw new Error("상세 정보가 없습니다.");

  return item;
}

// 부가 정보 불러오기
export async function fetchSpotIntro(contentId, contentTypeId) {
  const params = {
    MobileOS: "ETC",
    MobileApp: "AERO",
    contentId,
    contentTypeId,
    _type: "json",
    serviceKey: import.meta.env.VITE_SPOT_API_KEY,
  };

  const response = await APIService.public.get(BASE_INTRO_URL, { params });
  const item = response?.response?.body?.items?.item?.[0];

  if (!item) throw new Error("부가 정보가 없습니다.");

  return item;
}

/**
 * 베리어프리 정보 요청
 * @param {string} contentId - 콘텐츠 ID
 * @returns {Promise<Object|null>} - 베리어프리 정보 객체 또는 null
 */
export async function fetchBarrierFreeInfo(contentId) {
  const params = {
    MobileOS: "ETC",
    MobileApp: "AERO",
    contentId,
    _type: "json",
    serviceKey: import.meta.env.VITE_SPOT_API_KEY, // .env에서 관리
  };

  try {
    const response = await APIService.public.get(BASE_URL_BARRIER, { params });
    const item = response?.response?.body?.items?.item?.[0];
    return item ?? null;
  } catch (error) {
    console.error("베리어프리 정보 요청 실패:", error);
    return null;
  }
}
