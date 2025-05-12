import styles from "./facilityIcons.module.css";

const icons = [
  { label: "경사로", emoji: "🦽" },
  { label: "장애인 주차장", emoji: "🅿️" },
  { label: "장애인 화장실", emoji: "🚻" },
  { label: "휠체어 대여", emoji: "🦼" },
  { label: "엘리베이터", emoji: "🛗" },
];

export default function FacilityIcons() {
  return (
    <div className={styles.container}>
      {icons.map((item, i) => (
        <div key={i} className={styles.iconItem}>
          <div className={styles.emoji}>{item.emoji}</div>
          <div className={styles.label}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}
