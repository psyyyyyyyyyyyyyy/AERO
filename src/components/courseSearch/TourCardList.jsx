import { useNavigate } from "react-router-dom";
import styles from "./tourcardlist.module.css";

export default function TourCardList() {
  const navigate = useNavigate();

  return (
    <div className={styles.grid}>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={styles.card}
            onClick={() => navigate("/example")}
          ></div>
        ))}
    </div>
  );
}
