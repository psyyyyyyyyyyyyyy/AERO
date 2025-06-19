import { useEffect, useRef, useState } from "react";

export default function SpotMap({ lat, lng }) {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=2r3fv1mwmg&submodules=geocoder";
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);

    if (!window.naver || !window.naver.maps) {
      document.head.appendChild(script);
    } else {
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!mapLoaded || !window.naver || !mapRef.current || !lat || !lng) return;

    const { naver } = window;
    const location = new naver.maps.LatLng(lat, lng);
    const map = new naver.maps.Map(mapRef.current, {
      center: location,
      zoom: 16, //확대 레벨 
    });

    new naver.maps.Marker({
      position: location,
      map,
    });

    window.naver.maps.Event.trigger(map, "resize");
  }, [mapLoaded, lat, lng]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "300px",
        borderRadius: "12px",
        marginTop: "24px",
      }}
    />
  );
}
