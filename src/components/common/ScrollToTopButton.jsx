import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import styles from "./scrollToTopButton.module.css";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치에 따라 버튼 표시 여부 결정
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200); // 200px 이상 스크롤 시 표시
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return isVisible ? (
    <button className={styles.scrollButton} onClick={scrollToTop}>
      <FaArrowUp />
    </button>
  ) : null;
}
