import { useEffect, useRef } from "react";

export default function MyMap({ onMarkerClick }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      const { naver } = window;
      if (!naver || !mapRef.current) return;

      const map = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(35.8, 127.8),
        zoom: 7,
      });

      window.naver.maps.Event.trigger(map, "resize");

      // 마커 예시
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5665, 126.978),
        map,
      });

      naver.maps.Event.addListener(marker, "click", () => {
        onMarkerClick?.({
          id: 1,
          text: "서울 여행",
          image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        });
      });
    };

    const script = document.createElement("script");
    script.src = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=2r3fv1mwmg";
    script.async = true;
    script.defer = true;
    script.onload = loadMap;

    if (!window.naver || !window.naver.maps) {
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, [onMarkerClick]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "600px",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    />
  );
}
