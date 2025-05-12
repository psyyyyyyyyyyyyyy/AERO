import styles from "./tagFilter.module.css";

const tags = ["#혼자서", "#둘이서", "#감성적인", "#액티비티", "#커플"];

export default function TagFilter() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tagContainer}>
        {tags.map((tag, index) => (
          <button
            key={index}
            className={`${styles.tag} ${index === 0 ? styles.active : ""}`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className={styles.gradient} />
    </div>
  );
}
