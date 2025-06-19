import { useEffect, useRef } from "react";
import styles from "./mapSection.module.css";
import { useScheduleStore } from "../../stores/useScheduleStore";

export default function MapSection({ selectedDay }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const polylineRef = useRef(null);

  const allSchedules = useScheduleStore((state) => state.schedulesByDay);
  const places = (allSchedules[selectedDay] || []).filter((p) => p.value);

  const loadNaverMap = () => {
    const { naver } = window;
    if (!naver || !mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(37.5665, 126.978),
        zoom: 12,
      });
    }

    const map = mapInstance.current;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 기존 선 제거
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    const bounds = new naver.maps.LatLngBounds();
    const path = [];

    places.forEach((place, idx) => {
      const position = new naver.maps.LatLng(place.mapY, place.mapX);
      bounds.extend(position);
      path.push(position);

      const marker = new naver.maps.Marker({
        position,
        map,
        icon: {
          content: `
            <div style="
              background: #7ed6ea;
              color: white;
              width: 30px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              font-weight: bold;
              font-size: 14px;
              border: 2px solid white;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            ">${idx + 1}</div>
          `,
          anchor: new naver.maps.Point(15, 15),
        },
      });

      markersRef.current.push(marker);
    });

    // 마커 간 선 그리기
    if (path.length >= 2) {
      polylineRef.current = new naver.maps.Polyline({
        path,
        map,
        strokeColor: "#7ed6ea",
        strokeWeight: 4,
        strokeOpacity: 0.8,
        strokeStyle: "solid",
      });
    }

    // 마커가 있을 경우만 영역 보정
    if (places.length > 0) {
      const paddedBounds = addPaddingToBounds(bounds, 0.01); // 약간의 여유 공간 추가
      map.fitBounds(paddedBounds);
    }

    setTimeout(() => {
      naver.maps.Event.trigger(map, "resize");
    }, 200);
  };

  // bounds 여유 공간 확보
  const addPaddingToBounds = (bounds, padding) => {
    const sw = bounds.getSW();
    const ne = bounds.getNE();
    const newSW = new window.naver.maps.LatLng(sw.lat() - padding, sw.lng() - padding);
    const newNE = new window.naver.maps.LatLng(ne.lat() + padding, ne.lng() + padding);
    return new window.naver.maps.LatLngBounds(newSW, newNE);
  };

  useEffect(() => {
    if (!window.naver || !window.naver.maps) {
      const script = document.createElement("script");
      script.src =
        "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=2r3fv1mwmg";
      script.async = true;
      script.defer = true;
      script.onload = loadNaverMap;
      document.head.appendChild(script);
    } else {
      loadNaverMap();
    }
  }, [places, selectedDay]);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} className={styles.map}></div>
    </div>
  );
}
