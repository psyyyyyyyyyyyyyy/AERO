import styles from "./course.module.css";
import CourseCard from "./CourseCard";

export default function UserCourse() {
  return (
    <section className={styles.section}>
      <p className={styles.subtitle}>사용자들이 직접 정한 숨은 코스</p>
      <h2 className={styles.title}>사용자 작성 코스</h2>
      <div className={styles.cardContainer}>
        <CourseCard />
        <CourseCard />
      </div>
    </section>
  );
}
