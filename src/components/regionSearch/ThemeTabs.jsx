import { useEffect } from "react";
import styles from "./themeTabs.module.css";

const THEME_OPTIONS = [
  { name: "자연관광", code: "NA" },
  { name: "역사관광", code: "HS" },
  { name: "문화관광", code: "VE" },
  { name: "레저스포츠", code: "LS" },
  { name: "쇼핑", code: "SH" },
  { name: "음식", code: "FD" },
  { name: "축제/공연/행사", code: "EV" },
];

export default function ThemeTabs({ selectedThemes, onChange }) {
  useEffect(() => {
    if (!selectedThemes || selectedThemes.length === 0) {
      onChange(["NA"]);
    }
  }, [selectedThemes, onChange]);

  const toggleTheme = (code) => {
    if (selectedThemes.includes(code)) {
      onChange(selectedThemes.filter((c) => c !== code));
    } else {
      onChange([...selectedThemes, code]);
    }
  };

  return (
    <div className={styles.tabWrapper}>
      {THEME_OPTIONS.map(({ name, code }) => (
        <button
          key={code}
          className={`${styles.tab} ${selectedThemes.includes(code) ? styles.active : ""}`}
          onClick={() => toggleTheme(code)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
