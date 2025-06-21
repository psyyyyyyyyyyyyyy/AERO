import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "./courseTitle.module.css";
import {
  likeAiCourse,
  unlikeAiCourse,
  likeUserCourse,
  unlikeUserCourse,
} from "../../api/LikeApi";
import defaultImage from "../../assets/images/courseSearch/빈이미지.png";

export default function CourseTitle({ course }) {
  const { id, type } = useParams();
  const [liked, setLiked] = useState(course.liked);
  const [likeCount, setLikeCount] = useState(course.likeCount);

  const {
    title,
    theme,
    startDate,
    endDate,
    people,
    schedules,
    detailedSchedule,
  } = course;

  // 이미지 추출 (AI/USER 공통 처리)
  const firstValidImage =
    schedules?.find((s) => s.imageUrl && s.imageUrl.trim() !== "")?.imageUrl ||
    detailedSchedule?.find((s) => s.firstImage && s.firstImage.trim() !== "")
      ?.firstImage ||
    "";

  // 날짜 YYYY.MM.DD 형식으로 포맷
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")}`;
  };

  const formattedStart = formatDate(startDate);
  const formattedEnd = formatDate(endDate);

  const handleLikeToggle = async () => {
    try {
      if (liked) {
        if (type === "ai") {
          await unlikeAiCourse(id);
        } else {
          await unlikeUserCourse(id);
        }
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        if (type === "ai") {
          await likeAiCourse(id);
        } else {
          await likeUserCourse(id);
        }
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <img
        src={
          firstValidImage && firstValidImage.trim() !== ""
            ? firstValidImage
            : defaultImage
        }
        alt="header"
        className={styles.headerImage}
      />

      <div className={styles.overlay} />
      <div className={styles.titleContainer}>
        <div className={styles.topRow}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.heartWrapper} onClick={handleLikeToggle}>
            {liked ? (
              <FaHeart className={styles.heartIcon} />
            ) : (
              <FaRegHeart className={styles.heartIcon} />
            )}{" "}
            {likeCount}
          </div>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.tag}>#{theme}</span>
          <span className={styles.date}>
            {formattedStart} ~ {formattedEnd}
          </span>
          <span className={styles.people}>{people}</span>
        </div>
      </div>
    </div>
  );
}
