import styles from "./facilityIcons.module.css";

import wheelchairIcon from "../../assets/images/경사로.png";
import parkingIcon from "../../assets/images/장애인 주차장.png";
import toiletIcon from "../../assets/images/장애인 화장실.png";
import rentalIcon from "../../assets/images/휠체어.png";
import elevatorIcon from "../../assets/images/엘리베이터.png";

export default function FacilityIcons() {
  const items = [
    { name: "경사로", icon: wheelchairIcon },
    { name: "장애인 주차장", icon: parkingIcon },
    { name: "장애인 화장실", icon: toiletIcon },
    { name: "휠체어 대여", icon: rentalIcon },
    { name: "엘리베이터", icon: elevatorIcon },
  ];
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div key={item.name} className={styles.iconItem}>
          <div className={styles.iconBox}>
            <img src={item.icon} alt={item.name} className={styles.iconImage} />
          </div>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
