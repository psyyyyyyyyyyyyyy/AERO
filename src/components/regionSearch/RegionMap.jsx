import { useState } from "react";
import styles from "./regionmap.module.css";

export default function RegionMap({
  paths,
  viewBox = "0 0 800 800",
  onSelect,
}) {
  const [selected, setSelected] = useState(null);

  const handleClick = (id, sigunguCode) => {
    const isDeselect = id === selected;
    const newSelected = isDeselect ? null : id;
    setSelected(newSelected);
    onSelect(isDeselect ? "" : sigunguCode);
  };

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <div className={styles.mapContainer}>
        <svg
          viewBox={viewBox}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {paths.map(({ id, name, d, label, sigunguCode }) => (
            <g key={id}>
              <path
                d={d}
                onClick={() => handleClick(id, sigunguCode)}
                fill={selected === id ? "#D3F1FC" : "#fff"}
                stroke="#000"
                style={{ cursor: "pointer" }}
                onMouseOver={(e) => e.currentTarget.removeAttribute("title")}
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
