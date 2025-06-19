import { useEffect, useRef } from "react";
import styles from "./naverMapView.module.css";

export default function NaverMapView({ places = [] }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const polylineRef = useRef(null);

  const addPaddingToBounds = (bounds, padding) => {
    const sw = bounds.getSW();
    const ne = bounds.getNE();
    const newSW = new window.naver.maps.LatLng(sw.lat() - padding, sw.lng() - padding);
    const newNE = new window.naver.maps.LatLng(ne.lat() + padding, ne.lng() + padding);
    return new window.naver.maps.LatLngBounds(newSW, newNE);
  };

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

    // 기존 마커/선 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    const bounds = new naver.maps.LatLngBounds();
    const path = [];

    // mapX, mapY 기반 마커 찍기
    places.forEach((place, i) => {
      if (!place.mapX || !place.mapY) return;

      const latlng = new naver.maps.LatLng(place.mapY, place.mapX);
      bounds.extend(latlng);
      path.push(latlng);

      const marker = new naver.maps.Marker({
        position: latlng,
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
            ">${i + 1}</div>
          `,
          anchor: new naver.maps.Point(15, 15),
        },
      });

      markersRef.current.push(marker);
    });

    // 경로 선 그리기
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

    // 마커 있을 경우 영역 조정
    if (path.length > 0) {
      const paddedBounds = addPaddingToBounds(bounds, 0.01);
      map.fitBounds(paddedBounds);
    }

    setTimeout(() => {
      naver.maps.Event.trigger(map, "resize");
    }, 200);
  };

  useEffect(() => {
    if (!window.naver || !window.naver.maps) {
      const script = document.createElement("script");
      script.src =
        "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=2r3fv1mwmg&submodules=geocoder";
      script.async = true;
      script.defer = true;
      script.onload = loadNaverMap;
      document.head.appendChild(script);
    } else {
      loadNaverMap();
    }
  }, [places]);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} className={styles.map}></div>
    </div>
  );
}
