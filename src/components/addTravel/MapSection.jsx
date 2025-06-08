import { useEffect, useRef } from "react";
import styles from "./mapSection.module.css";

export default function MapSection() {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadNaverMap = () => {
      const { naver } = window;
      if (!naver || !mapRef.current) return;

      const map = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(35.84, 129.21),
        zoom: 10,
      });

      new naver.maps.Marker({
        position: new naver.maps.LatLng(35.84, 129.21),
        map,
      });

      window.naver.maps.Event.trigger(map, "resize");
    };

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
  }, []);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} className={styles.map}></div>
    </div>
  );
}
