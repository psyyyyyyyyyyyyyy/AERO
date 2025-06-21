import axios from "axios";

const WEATHER_API_URL = "http://apis.data.go.kr/1360000/ImpactInfoService/getHWImpactValue";
const SERVICE_KEY = import.meta.env.VITE_SPOT_API_KEY;

export async function fetchHWImpact({ regId, date }) {
  if (!regId) throw new Error("regId는 필수입니다");

  const params = {
    serviceKey: SERVICE_KEY,
    pageNo: 1,
    numOfRows: 10,
    dataType: "JSON",
    regId,
    tm: date,
  };

  const { data } = await axios.get(WEATHER_API_URL, { params });
  return data;
}

const WEATHER2_API_KEY = import.meta.env.VITE_SPOT_API_KEY;
const BASE_URL2 = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";

// 현재 날짜/시간 포맷 (정시 기준)
const getBaseDateTime = () => {
  const now = new Date();
  now.setHours(now.getHours() - 1); // 1시간 전으로 이동

  const pad = (n) => n.toString().padStart(2, "0");

  const baseDate = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const baseTime = `${pad(now.getHours())}00`; // 정시만 지원

  return { baseDate, baseTime };
};

export const fetchCurrentWeather = async ({ nx, ny }) => {
  const { baseDate, baseTime } = getBaseDateTime();

  const params = {
    serviceKey: WEATHER2_API_KEY,
    pageNo: "1",
    numOfRows: "1000",
    dataType: "JSON",
    base_date: baseDate,
    base_time: baseTime,
    nx,
    ny,
  };

  try {
    const response = await axios.get(BASE_URL2, { params });
    return response.data.response.body.items.item;
  } catch (error) {
    console.error("기상 API 요청 실패:", error);
    return null;
  }
};