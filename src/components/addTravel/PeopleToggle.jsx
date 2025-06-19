import { useState, useRef, useEffect } from "react";
import styles from "./peopleToggle.module.css";
import { FiChevronDown } from "react-icons/fi";

const options = [
  "혼자서",
  "친구와",
  "연인과",
  "가족과",
  "배우자와",
  "부모님과",
  "아이와",
  "기타",
];

export default function PeopleToggle({ selected, setSelected }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  // 바깥 클릭 시 닫힘 처리
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.selected} onClick={() => setOpen(!open)}>
        <span>{selected || "일행 선택"}</span>
        <FiChevronDown className={styles.icon} />
      </div>
      {open && (
        <ul className={styles.dropdown}>
          {options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
