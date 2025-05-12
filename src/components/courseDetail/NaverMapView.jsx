import { useEffect } from "react";
import styles from "./naverMapView.module.css";

export default function NaverMapView() {
  useEffect(() => {
    const loadNaverMap = () => {
      const script = document.createElement("script");
      script.src =
        "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=2r3fv1mwmg";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        const { naver } = window;
        if (!naver) return;

        const mapDiv = document.getElementById("map");
        if (!mapDiv) return;

        const map = new naver.maps.Map("map", {
          center: new naver.maps.LatLng(35.84, 129.21),
          zoom: 10,
        });

        new naver.maps.Marker({
          position: new naver.maps.LatLng(35.84, 129.21),
          map,
        });

        window.naver.maps.Event.trigger(map, "resize");
      };
      document.head.appendChild(script);
    };

    // 이미 로드된 경우 방지
    if (!window.naver || !window.naver.maps) {
      loadNaverMap();
    }
  }, []);

  return <div id="map" className={styles.map}></div>;
}
