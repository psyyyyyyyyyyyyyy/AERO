import axios from "axios";
import dayjs from "dayjs";

const BASE_URL = "https://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrWrnMsg";
const SERVICE_KEY = import.meta.env.VITE_SPOT_API_KEY;

const REGION_TO_STNID = {
  "전국": "108",
  "서울, 인천, 경기도": "109",
  "부산, 울산, 경상남도": "159",
  "대구, 경상북도": "143",
  "광주, 전라남도": "156",
  "전북자치도": "146",
  "대전, 세종, 충청남도": "133",
  "충청북도": "131",
  "강원도": "105",
  "제주도": "184",
};

export async function fetchWeatherAlert(regionName) {
  const stnId = REGION_TO_STNID[regionName] || REGION_TO_STNID["서울, 인천, 경기도"];
  const now = dayjs();

  const params = {
    serviceKey: decodeURIComponent(SERVICE_KEY),
    numOfRows: 10,
    pageNo: 1,
    dataType: "JSON",
    stnId,
    fromTmFc: now.format("YYYYMMDD"),
    toTmFc: now.format("YYYYMMDD"),
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data.response.body.items.item;
  } catch (error) {
    return null;
  }
}