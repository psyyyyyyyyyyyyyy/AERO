import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import MyMap from "../components/myMap/MyMap";
import MarkerModal from "../components/myMap/MarkerModal";
import EditModal from "../components/myMap/EditModal";
import { fetchTravelLogs } from "../api/MyMapApi";
import styles from "./myMapPage.module.css";

export default function MyMapPage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [logs, setLogs] = useState([]); // 여행 기록 상태

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchTravelLogs();
        setLogs(data); // [{ id, address, imageUrl, content }]
      } catch (err) {
        console.error("여행 기록 불러오기 실패:", err);
      }
    };

    loadLogs();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h2>My Travel Map 🗺️</h2>
          <button
            className={styles.editBtn}
            onClick={() => setShowEditModal(true)}
          >
            edit
          </button>
        </header>

        {/* 여행기록 전달 */}
        <MyMap logs={logs} onMarkerClick={setSelectedMarker} />

        {selectedMarker && (
          <MarkerModal
            onClose={() => setSelectedMarker(null)}
            markerData={selectedMarker}
          />
        )}
        {showEditModal && <EditModal onClose={() => setShowEditModal(false)} />}
      </div>
    </>
  );
}
