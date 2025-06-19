import { useEffect, useRef, useState } from "react";
import markerImage from "../../assets/images/myMap/marker.png"; 

export default function MyMap({ logs = [], onMarkerClick }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [isMapReady, setIsMapReady] = useState(false);

  // 지도 & geocoder 로딩
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=2r3fv1mwmg&submodules=geocoder";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const { naver } = window;
      if (!naver || !mapRef.current) return;

      const map = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(35.8, 127.8),
        zoom: 7,
      });

      mapInstanceRef.current = map;
      window.naver.maps.Event.trigger(map, "resize");

      const checkReady = () => {
        if (naver.maps.Service && naver.maps.Service.geocode) {
          setIsMapReady(true);
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
    };

    document.head.appendChild(script);
  }, []);

  // logs 변경 시 새 마커 추가
  useEffect(() => {
    if (!isMapReady) return;

    const { naver } = window;
    const map = mapInstanceRef.current;
    if (!naver || !map || !naver.maps.Service?.geocode) return;

    logs.forEach((log) => {
      if (!log.address?.trim()) return;

      const exists = markersRef.current.some(
        (markerObj) => markerObj.id === log.id
      );
      if (exists) return;

      naver.maps.Service.geocode({ query: log.address }, (status, response) => {
        if (status !== naver.maps.Service.Status.OK) return;
        const result = response.v2.addresses[0];
        if (!result) return;

        const latlng = new naver.maps.LatLng(result.y, result.x);
        
        const marker = new naver.maps.Marker({
          position: latlng,
          map,
          icon: {
            content: `<img src="${markerImage}" style="width: 30px; height: 40px;" />`,
            anchor: new naver.maps.Point(15, 40), // 중심 위치 조절
          },
        });

        markersRef.current.push({ id: log.id, marker });

        naver.maps.Event.addListener(marker, "click", () => {
          onMarkerClick?.({
            id: log.id,
            text: log.content,
            image: log.imageUrl,
          });
        });
      });
    });
  }, [logs, isMapReady]);

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
