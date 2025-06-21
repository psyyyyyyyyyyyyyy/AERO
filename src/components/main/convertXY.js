export default function convertXY(lat, lon) {
  const RE = 6371.00877; // 지구 반경 (km)
  const GRID = 5.0; // 격자 간격 (km)
  const SLAT1 = 30.0; // 투영 위도1
  const SLAT2 = 60.0; // 투영 위도2
  const OLON = 126.0; // 기준점 경도
  const OLAT = 38.0; // 기준점 위도
  const XO = 43; // 기준점 X좌표
  const YO = 136; // 기준점 Y좌표

  const DEGRAD = Math.PI / 180.0;
  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  const sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  const snLog = Math.log(Math.cos(slat1) / Math.cos(slat2));
  const snValue = snLog / Math.log(sn);

  const sf =
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  const sfValue = Math.pow(sf, snValue) * Math.cos(slat1) / snValue;

  const ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  const roValue = re * sfValue / Math.pow(ro, snValue);

  const ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  const raValue = re * sfValue / Math.pow(ra, snValue);

  let theta = lon * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= snValue;

  const nx = Math.floor(raValue * Math.sin(theta) + XO + 0.5);
  const ny = Math.floor(roValue - raValue * Math.cos(theta) + YO + 0.5);

  return { nx, ny };
}
