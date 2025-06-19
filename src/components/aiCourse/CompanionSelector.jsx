import styles from "./companionSelector.module.css";

const companions = ["혼자서", "친구와", "배우자와", "가족과", "부모님과", "연인과", "아이와", "기타"];

export default function CompanionSelector({ value, onChange }) {
  return (
    <div className={styles.container}>
      <p className={styles.question}>😎 누구와 떠나나요?</p>
      <div className={styles.options}>
        {companions.map((item) => (
          <button
            key={item}
            className={`${styles.option} ${value === item ? styles.active : ""}`}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
