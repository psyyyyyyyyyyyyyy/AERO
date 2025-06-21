import styles from "./themeCourse.module.css";
import SpotCard from "../common/SpotCard";

export default function ThemeCourse({ title, sub, items = [], type }) {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.sub}>{sub}</p>
      <div className={styles.cardContainer}>
        {items.map((item) => {
          const isSpot = type === "spot";
          console.log("items:", items, "type:", type);


          return (
            <SpotCard
              key={isSpot ? item.contentId : item.id}
              image={isSpot ? item.firstImage : item.imageUrl || ""}
              title={item.title}
              location={isSpot ? item.address : item.theme}
            />
          );
        })}
      </div>
    </section>
  );
}
