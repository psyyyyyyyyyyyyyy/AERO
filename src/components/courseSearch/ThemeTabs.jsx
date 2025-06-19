import styles from "../../components/regionSearch/regionTabs.module.css";

const themes = [
  "자연관광",
  "역사관광",
  "문화관광",
  "레저스포츠",
  "쇼핑",
  "음식",
  "축제/공연/행사",
];

export default function ThemeTabs({ selectedTheme, onSelect }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabContainer}>
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => onSelect(theme)}
            className={`${styles.tab} ${theme === selectedTheme ? styles.active : ""}`}
          >
            {theme}
          </button>
        ))}
      </div>
      <div className={styles.gradient} />
    </div>
  );
}
