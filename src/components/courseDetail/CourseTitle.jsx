import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // 빈/채운 하트 둘 다 import
import styles from "./courseTitle.module.css";

export default function CourseTitle() {
  const [liked, setLiked] = useState(false);

  const toggleHeart = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
        alt="header"
        className={styles.headerImage}
      />
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>🚀 경주 어찌구 여행</h2>
        <button className={styles.heartButton} onClick={toggleHeart}>
          {liked ? (
            <FaHeart className={styles.heartIcon} />
          ) : (
            <FaRegHeart className={styles.heartIcon} />
          )}
        </button>
      </div>
    </div>
  );
}
