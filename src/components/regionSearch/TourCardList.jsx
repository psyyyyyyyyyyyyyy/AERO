import { useNavigate } from "react-router-dom";
import styles from "./tourCardList.module.css";
import defaultImage from "../../assets/images/regionSearch/빈 이미지.png";

export default function TourCardList({ spots = [] }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/spot/${id}`);
  };

  return (
    <div className={styles.grid}>
      {spots.map((spot) => {
        const backgroundImg = spot.firstImage?.trim()
          ? spot.firstImage
          : defaultImage;

        return (
          <div
            key={spot.contentId}
            className={styles.card}
            onClick={() => handleClick(spot.contentId)}
            style={{
              backgroundImage: `url(${backgroundImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
            }}
          >
            <div className={styles.overlay}>
              <div className={styles.textTop}>
                <h3 className={styles.title}>{spot.title}</h3>
                <p className={styles.address}>{spot.address}</p>
              </div>
              <div className={styles.textBottom}>
                <p className={styles.like}>❤️ {spot.likeCount}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
