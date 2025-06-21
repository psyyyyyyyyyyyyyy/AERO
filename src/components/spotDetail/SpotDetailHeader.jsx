import styles from "./spotDetailHeader.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { likeSpot, unlikeSpot } from "../../api/SpotDetailApi";
import defaultImage from "../../assets/images/spotDetail/빈이미지.png";

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
      <img
        src={image && image.trim() !== "" ? image : defaultImage}
        alt={title}
        className={styles.mainImage}
      />
    </div>
  );
}
