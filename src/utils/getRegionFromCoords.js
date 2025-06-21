export async function getRegionFromCoords(lat, lng) {
  return new Promise((resolve, reject) => {
    if (!window.naver?.maps?.Service) {
      return reject("Naver Maps API 로드되지 않음");
    }

    const latlng = new window.naver.maps.LatLng(lat, lng);

    window.naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: ["legalcode"], // 시도/시군구 포함된 주소 체계
      },
      (status, response) => {
        if (status !== window.naver.maps.Service.Status.OK) {
          return reject("역지오코딩 실패");
        }

        const result = response.v2.results?.[0];
        const area1 = result.region.area1.name; // 예: 서울특별시
        const area2 = result.region.area2.name; // 예: 강남구

        resolve(`${area1} ${area2}`); // 예: 서울특별시 강남구
      }
    );
  });
}
