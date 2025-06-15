import styles from "./spotDetailHeader.module.css";

export default function SpotDetailHeader({ image, title }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <img src={image} alt={title} className={styles.mainImage} />
    </div>
  );
}
