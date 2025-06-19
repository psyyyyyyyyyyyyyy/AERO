import styles from "./spotDetailHeader.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { likeSpot, unlikeSpot } from "../../api/SpotDetailApi";

export default function SpotDetailHeader({
  image,
  title,
  tourSpotId,
  initialLiked,
}) {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        await unlikeSpot(tourSpotId);
      } else {
        await likeSpot(tourSpotId);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("❤️ 좋아요 요청 실패", error);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <h1 className={styles.title}>{title}</h1>
        <span onClick={handleLikeToggle} className={styles.heartIcon}>
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </span>
      </div>
      <img src={image} alt={title} className={styles.mainImage} />
    </div>
  );
}
