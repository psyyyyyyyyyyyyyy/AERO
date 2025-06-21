import { useNavigate } from "react-router-dom";
import styles from "./tourCardList.module.css";
import publictransportIcon from "../../assets/images/publictransport.png";
import elevatorIcon from "../../assets/images/elevator.png";
import wheelchairIcon from "../../assets/images/wheelchair.png";
import guidehumanIcon from "../../assets/images/guidehuman.png";
import restroomIcon from "../../assets/images/restroom.png";
import parkingIcon from "../../assets/images/parking.png";
import roomIcon from "../../assets/images/room.png";
import defaultImage from "../../assets/images/courseSearch/빈이미지.png";

// 편의시설 아이콘 매핑
const barrierFreeIcons = {
  publictransport: publictransportIcon,
  elevator: elevatorIcon,
  wheelchair: wheelchairIcon,
  guidehuman: guidehumanIcon,
  restroom: restroomIcon,
  parking: parkingIcon,
  room: roomIcon,
};

export default function TourCardList({ spots }) {
  const navigate = useNavigate();

  if (!spots || spots.length === 0) {
    return <div className={styles.empty}>조회된 코스가 없습니다.</div>;
  }

  return (
    <div className={styles.grid}>
      {spots.map((spot) => (
        <div
          key={spot.id}
          className={styles.card}
          onClick={() => navigate(`/courses/${spot.type}/${spot.id}`)}
        >
          <img
            src={
              spot.imageUrl && spot.imageUrl.trim() !== ""
                ? spot.imageUrl
                : defaultImage
            }
            alt={spot.title}
            className={styles.image}
          />
          <div className={styles.info}>
            <div className={styles.title}>{spot.title}</div>
            <div className={styles.people}>{spot.people}</div>
            <div className={styles.bottomSection}>
              <div className={styles.barrierFreeIcons}>
                {spot.barrierFreeKeys?.map((key) =>
                  barrierFreeIcons[key] ? (
                    <img
                      key={key}
                      src={barrierFreeIcons[key]}
                      alt={key}
                      className={styles.icon}
                    />
                  ) : null
                )}
              </div>
              <div className={styles.like}>❤️ {spot.likeCount}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
