import styles from "./course.module.css";
import CourseCard from "./CourseCard";

export default function RecommendedCourse() {
  return (
    <section className={styles.section}>
      <p className={styles.subtitle}>실패율 ZERO 언제나 사랑받는 곳 위주로</p>
      <h2 className={styles.title}>여행 추천 코스</h2>
      <div className={styles.cardContainer}>
        <CourseCard />
        <CourseCard />
      </div>
    </section>
  );
}
