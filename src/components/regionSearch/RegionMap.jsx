import { useState } from "react";
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import styles from "./regionMap.module.css";

export default function RegionMap({ paths, regionName, viewBox = "0 0 800 800" }) {
  const [selected, setSelected] = useState([]);

  const handleClick = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === paths.length) {
      setSelected([]);
    } else {
      setSelected(paths.map((p) => p.id));
    }
  };

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <button className={styles.selectAllButton} onClick={handleSelectAll}>
        {selected.length === paths.length ? (
          <FiCheckCircle size={16} />
        ) : (
          <FiCircle size={16} />
        )}
        전체 선택
      </button>
      <div className={styles.mapContainer}>
        <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
          {paths.map(({ id, name, d, label }) => (
            <g key={id}>
              <path
                d={d}
                onClick={() => handleClick(id)}
                fill={selected.includes(id) ? "#7ED6EA" : "#fff"}
                stroke="#000"
                style={{ cursor: "pointer" }}
              />
              <text className={styles.regionName}
                x={label.x}
                y={label.y}
              >
                {name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
