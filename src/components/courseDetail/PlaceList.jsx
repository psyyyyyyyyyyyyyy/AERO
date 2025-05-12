import { useState } from "react";
import styles from "./placeList.module.css";
import ScheduleModal from "./ScheduleModal";

const places = [
  {
    id: 1,
    name: "불국사",
    address: "경주시 진현동 산 15",
    memo: "메모가 없습니다.",
  },
  {
    id: 2,
    name: "불국사",
    address: "경주시 진현동 산 15",
    memo: "메모가 없습니다.",
  },
  {
    id: 3,
    name: "불국사",
    address: "경주시 진현동 산 15",
    memo: "메모가 없습니다.",
  },
];

export default function PlaceList() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={styles.listWrapper}>
        {places.map((place, i) => (
          <div key={place.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <div className={styles.image} />
              <div className={styles.order}>{i + 1}</div>
            </div>
            <div className={styles.name}>{place.name}</div>
            <div className={styles.address}>{place.address}</div>
            <div className={styles.memo}>{place.memo}</div>
          </div>
        ))}
      </div>
      <div className={styles.addBtnContainer}>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          + 상세 일정
        </button>
      </div>
      {showModal && <ScheduleModal onClose={() => setShowModal(false)} />}
    </>
  );
}
