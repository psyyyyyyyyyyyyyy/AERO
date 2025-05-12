import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import styles from "./courseCard.module.css";

export default function CourseCard() {
  const [liked, setLiked] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          alt="course"
          className={styles.image}
        />
        <button
          className={`${styles.heartButton} ${liked ? styles.liked : ""}`}
          onClick={() => setLiked((prev) => !prev)}
        >
          {liked ? <FaHeart /> : <FiHeart />}
        </button>
      </div>
      <div className={styles.text}>고요한 하루를 위한 힐링의 숲길</div>
    </div>
  );
}
