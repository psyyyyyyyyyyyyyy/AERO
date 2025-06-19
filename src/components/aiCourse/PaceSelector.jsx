import styles from "./paceSelector.module.css";

const paceOptions = ["널널하게", "빡빡하게"];

export default function PaceSelector({ value, onChange }) {
  return (
    <div className={styles.container}>
      <p className={styles.question}>🗓️ 여행은 어떤게 좋으세요?</p>
      <div className={styles.options}>
        {paceOptions.map((item) => (
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
