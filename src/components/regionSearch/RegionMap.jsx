import { useState } from "react";
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import styles from "./regionmap.module.css";

export default function RegionMap({
  paths,
  regionName,
  viewBox = "0 0 800 800",
  onSelect,
}) {
  const [selected, setSelected] = useState(null); // 단일 선택으로 변경

  const handleClick = (id, sigunguCode) => {
    const newSelected = id === selected ? null : id;
    setSelected(newSelected);
    onSelect(sigunguCode); // 부모로 시군구코드 전달
  };

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <div className={styles.mapContainer}>
        <svg
          viewBox={viewBox}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="auto"
          preserveAspectRatio="xMidYMid meet" // 반응형을 위한 비율 유지
        >
          {paths.map(({ id, name, d, label, sigunguCode }) => (
            <g key={id}>
              <path
                d={d}
                onClick={() => handleClick(id, sigunguCode)}
                fill={selected === id ? "#D3F1FC" : "#fff"}
                stroke="#000"
                style={{ cursor: "pointer" }}
              />
              <text className={styles.regionName} x={label.x} y={label.y}>
                {name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
