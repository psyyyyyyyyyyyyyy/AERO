import styles from "./themeSelector.module.css";

const themes = [
  "자연관광",
  "역사관광",
  "문화관광",
  "레저스포츠",
  "쇼핑",
  "음식",
  "축제/공연/행사",
];

export default function ThemeSelector({ value, onChange }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.question}>어떤 테마의 여행이 좋으세요?</h2>
      <div className={styles.options}>
        {themes.map((theme) => (
          <button
            key={theme}
            className={`${styles.option} ${value === theme ? styles.selected : ""}`}
            onClick={() => onChange(theme)}
          >
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
}
