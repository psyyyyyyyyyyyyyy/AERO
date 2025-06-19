import { useState, useEffect } from "react";
import styles from "./facilityoptions.module.css";
import publictransportIcon from "../../assets/images/publictransport.png";
import elevatorIcon from "../../assets/images/elevator.png";
import wheelchairIcon from "../../assets/images/wheelchair.png";
import guidehumanIcon from "../../assets/images/guidehuman.png";
import restroomIcon from "../../assets/images/restroom.png";
import parkingIcon from "../../assets/images/parking.png";
import roomIcon from "../../assets/images/room.png";

const options = [
  { label: "접근로 가능", value: "publictransport", icon: publictransportIcon },
  { label: "엘리베이터", value: "elevator", icon: elevatorIcon },
  { label: "휠체어 대여 가능", value: "wheelchair", icon: wheelchairIcon },
  { label: "안내요원", value: "guidehuman", icon: guidehumanIcon },
  { label: "장애인 화장실", value: "restroom", icon: restroomIcon },
  { label: "장애인 주차장", value: "parking", icon: parkingIcon },
  { label: "장애인용 객실", value: "room", icon: roomIcon },
];

export default function FacilityOptions({ visible, selected = [], onChange }) {
  const isAllSelected = selected.length === options.length;

  const toggleOption = (opt) => {
    const newSelected = selected.includes(opt)
      ? selected.filter((o) => o !== opt)
      : [...selected, opt];
    onChange(newSelected);
  };

  return (
    <div className={`${styles.options} ${visible ? styles.show : ""}`}>
      <div className={styles.btnRow}>
        {options.map((opt) => (
          <button
            key={opt.value}
            className={`${styles.optionBtn} ${
              selected.includes(opt.value) ? styles.selected : ""
            }`}
            onClick={() => toggleOption(opt.value)}
          >
            <img src={opt.icon} alt={opt.label} className={styles.icon} />
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
