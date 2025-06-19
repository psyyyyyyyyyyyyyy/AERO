import { useEffect, useState } from "react";
import styles from "./searchModal.module.css";
import { FiSearch, FiX, FiMapPin } from "react-icons/fi";
import { searchTourSpots } from "../../api/SearchModalApi";

export default function SearchModal({ onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  // 사용자 현재 위치 받아오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setCurrentLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  // 거리 계산 함수 (Haversine 공식)
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const handleSearch = async () => {
    const data = await searchTourSpots(query); // API 호출
    const list = data.content || [];

    if (currentLocation) {
      const enriched = list.map((spot) => ({
        ...spot,
        distance: getDistance(
          currentLocation.lat,
          currentLocation.lng,
          Number(spot.mapY),
          Number(spot.mapX)
        ).toFixed(1),
      }));
      setResults(enriched);
    } else {
      setResults(list);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.xButton}>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX />
        </button>
      </div>
      <div className={styles.header}>
        <input
          className={styles.searchInput}
          placeholder="검색어 입력"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles.iconButton} onClick={handleSearch}>
          <FiSearch />
        </button>
      </div>

      <div className={styles.resultList}>
        {results.map((item, index) => (
          <div
            key={item.id || index}
            className={styles.resultItem}
            onClick={() => onSelect(item)}
          >
            {item.firstImage ? (
              <img
                src={item.firstImage}
                alt={item.title}
                className={styles.thumbnail}
              />
            ) : (
              <div className={styles.noImage}>No Image</div>
            )}

            <div className={styles.info}>
              <strong>{item.title}</strong>
              <div>{item.address}</div>
            </div>

            {item.distance && (
              <div className={styles.distance}>{item.distance}km</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
