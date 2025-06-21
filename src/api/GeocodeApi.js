import axios from "axios";

const REVERSE_GEOCODE_URL = "https://maps.apigw.ntruss.com/map-reversegeocode/v2/gc";

const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
const clientSecret = import.meta.env.VITE_NAVER_CLIENT_SECRET;

export const getRegionFromCoords = async (lat, lon) => {
  try {
    const response = await axios.get(REVERSE_GEOCODE_URL, {
      params: {
        coords: `${lon},${lat}`, // 경도,위도 순서 주의
        output: "json",
        orders: "legalcode",
      },
      headers: {
        "X-NCP-APIGW-API-KEY-ID": clientId,
        "X-NCP-APIGW-API-KEY": clientSecret,
      },
    });

    const result = response.data.results?.[0];
    const area1 = result.region.area1.name;
    const area2 = result.region.area2.name;
    return `${area1} ${area2}`;
  } catch (err) {
    console.error("REST 역지오코딩 실패:", err);
    return "위치 확인 실패";
  }
};
