import Header from "../components/header/Header";
import MyMap from "../components/myMap/MyMap";
import MarkerModal from "../components/myMap/MarkerModal";
import EditModal from "../components/myMap/EditModal";
import { useState } from "react";
import styles from "./myMapPage.module.css";

export default function MyMapPage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

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

        <MyMap onMarkerClick={setSelectedMarker} />

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
