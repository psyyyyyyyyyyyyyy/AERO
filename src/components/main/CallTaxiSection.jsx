import { useState } from "react";
import styles from "./callTaxiSection.module.css";
import { callTaxiData } from "../../data/callTaxiData";

const regions = Object.keys(callTaxiData);

export default function CallTaxiSection() {
  const [selectedRegion, setSelectedRegion] = useState("서울");
  const regionInfo = callTaxiData[selectedRegion];

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>장애인 콜택시</h3>
      <p className={styles.desc}>
        누구든 여행할 수 있도록!
      </p>

      <div className={styles.wrapper}>
        <div className={styles.tagContainer}>
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`${styles.tag} ${
                selectedRegion === region ? styles.active : ""
              }`}
            >
              {region}
            </button>
          ))}
        </div>
        <div className={styles.gradient} />
      </div>

      <div className={styles.card}>
        <p><strong>운영기관:</strong> {regionInfo.org}</p>
        <p><strong>전화번호:</strong> {regionInfo.tel}</p>
        <p>
          <strong>홈페이지:</strong>{" "}
          <a href={regionInfo.url} target="_blank" rel="noreferrer">
            {regionInfo.url}
          </a>
        </p>
      </div>
    </section>
  );
}
