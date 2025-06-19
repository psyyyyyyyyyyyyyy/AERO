import styles from "./tagFilter.module.css";

const tags = ["자연관광", "역사관광", "문화관광", "레저스포츠", "쇼핑", "음식", "축제/공연/행사" ];

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
