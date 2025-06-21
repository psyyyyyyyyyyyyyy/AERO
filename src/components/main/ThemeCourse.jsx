import { useNavigate } from "react-router-dom";
import styles from "./themeCourse.module.css";
import SpotCard from "../common/SpotCard";

export default function ThemeCourse({ title, sub, items = [], type }) {
  const navigate = useNavigate();
  const isSpot = type === "spot";

  const handleViewAll = () => {
    navigate(isSpot ? "/spot" : "/course");
  };

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.sub}>{sub}</p>
      <div className={styles.cardContainer}>
        {items.map((item) => (
          <SpotCard
            key={isSpot ? item.contentId : item.id}
            image={isSpot ? item.firstImage : item.imageUrl || ""}
            title={item.title}
            location={isSpot ? item.address : item.theme}
          />
        ))}
      </div>
      <p className={styles.subText} onClick={handleViewAll}>
        전체보기 →
      </p>
    </section>
  );
}
