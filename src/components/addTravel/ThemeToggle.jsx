import { useState } from "react";
import styles from "./themeToggle.module.css";
import { FiChevronDown } from "react-icons/fi";

export default function ThemeToggle({ theme, setTheme }) {
  const options = ["자연관광", "역사관광", "문화관광", "레저스포츠", "쇼핑", "음식", "축제/공연/행사"];
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const selectOption = (option) => {
    setTheme(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.selected} onClick={toggle}>
        {theme || "테마 선택"}
        <FiChevronDown className={styles.icon} />
      </div>
      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map((option) => (
            <li key={option} onClick={() => selectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
