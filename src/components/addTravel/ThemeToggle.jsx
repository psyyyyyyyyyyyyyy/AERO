import { useState } from "react";
import styles from "./themeToggle.module.css";
import { IoChevronDownCircleOutline } from "react-icons/io5";

export default function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("테마명");
  const options = ["혼자서", "둘이서", "가족여행", "커플여행"];

  const toggle = () => setIsOpen((prev) => !prev);
  const selectOption = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.selected} onClick={toggle}>
        {selected}
        <IoChevronDownCircleOutline className={styles.icon} />
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
