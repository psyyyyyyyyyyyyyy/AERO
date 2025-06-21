import { useState, useRef } from "react";
import styles from "./placeList.module.css";
import ScheduleModal from "./ScheduleModal";
import defaultImage from "../../assets/images/courseDetail/빈 이미지.png";

import publictransportIcon from "../../assets/images/publictransport.png";
import elevatorIcon from "../../assets/images/elevator.png";
import wheelchairIcon from "../../assets/images/wheelchair.png";
import guidehumanIcon from "../../assets/images/guidehuman.png";
import restroomIcon from "../../assets/images/restroom.png";
import parkingIcon from "../../assets/images/parking.png";
import roomIcon from "../../assets/images/room.png";

export default function PlaceList({ schedules = [] }) {
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const rowRef = useRef(null);

  const barrierOptions = [
    {
      label: "접근로 가능",
      value: "publictransport",
      icon: publictransportIcon,
    },
    { label: "엘리베이터", value: "elevator", icon: elevatorIcon },
    { label: "휠체어 대여 가능", value: "wheelchair", icon: wheelchairIcon },
    { label: "안내요원", value: "guidehuman", icon: guidehumanIcon },
    { label: "장애인 화장실", value: "restroom", icon: restroomIcon },
    { label: "장애인 주차장", value: "parking", icon: parkingIcon },
    { label: "장애인용 객실", value: "room", icon: roomIcon },
  ];

  const handleClick = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  // 드래그 상태 관리
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - rowRef.current.offsetLeft;
    scrollLeft.current = rowRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = x - startX.current;
    rowRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <>
      <div
        className={styles.imageRow}
        ref={rowRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        {schedules.map((place, i) => {
          const key = place.id ?? i;
          return (
            <div key={key} className={styles.imageCardWrapper}>
              <div
                className={`${styles.imageCard} ${
                  selectedId === key ? styles.active : ""
                }`}
                onClick={() => handleClick(key)}
              >
                <img
                  src={
                    place.imageUrl && place.imageUrl.trim() !== ""
                      ? place.imageUrl
                      : place.firstImage && place.firstImage.trim() !== ""
                      ? place.firstImage
                      : defaultImage
                  }
                  alt={place.place}
                  className={styles.image}
                />
                <div className={styles.orderCircle}>{i + 1}</div>
                <div className={styles.placeOverlay}>{place.place}</div>
              </div>
            </div>
          );
        })}
      </div>

      {schedules.map((place, i) => {
        const key = place.id ?? i;
        return selectedId === key ? (
          <div key={key} className={styles.detailBox}>
            <div className={styles.detailTitle}>{place.place}</div>
            <div className={styles.detailAddress}>
              {place.address || "주소 정보 없음"}
            </div>
            <div className={styles.detailMemo}>{place.description}</div>

            {place.barrierFree && (
              <div className={styles.barrierIcons}>
                {barrierOptions.map((opt) =>
                  place.barrierFree[opt.value] ? (
                    <div key={opt.value} className={styles.iconItem}>
                      <img
                        src={opt.icon}
                        alt={opt.label}
                        className={styles.iconImage}
                      />
                      <span className={styles.iconLabel}>{opt.label}</span>
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>
        ) : null;
      })}

      <div className={styles.addBtnContainer}>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          + 상세 일정
        </button>
      </div>

      {showModal && <ScheduleModal onClose={() => setShowModal(false)} />}
    </>
  );
}
