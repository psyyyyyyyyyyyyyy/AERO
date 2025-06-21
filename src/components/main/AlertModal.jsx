import styles from "./alertModal.module.css";

export default function AlertModal() {
  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <p className={styles.title}>
          오늘 <strong>폭염주의보가 발령됩니다.</strong>
        </p>
        <p className={styles.description}>
          발령 위치 | 대한민국 전성분도 어디구
          <br />
          발령 시간 | 오전 8:00
          <br />
          모든 여행자는 알림을 참고하여 여행시 주의하고, 바깥 활동을
          자제해주세요.
        </p>
        <button className={styles.primaryButton}>
          폭우 시 대처 요령 자세히 보기
        </button>
        <button className={styles.secondaryButton}>오늘 하루 그만 보기</button>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import styles from "./alertModal.module.css";
// import { fetchHWImpact } from "../../api/MainApi";
// import regIdMap from "../../data/regIdMap.json";
// import dayjs from "dayjs";

// export default function AlertModal() {
//   const [selectedRegion, setSelectedRegion] = useState(null); // 선택된 시군구
//   const [alertData, setAlertData] = useState(null);

//   const handleRegionSelect = async (regionName) => {
//     const regId = regIdMap[regionName];
//     if (!regId) {
//       console.warn("예보구역 코드(regId) 없음:", regionName);
//       return;
//     }

//     setSelectedRegion(regionName);

//     try {
//       const date = dayjs().format("YYYYMMDD");
//       const result = await fetchHWImpact({ regId, date });
//       const item = result.response?.body?.items?.item?.[0];
//       if (item) {
//         setAlertData({ ...item, regionName });
//       }
//     } catch (err) {
//       console.error("폭염 경보 가져오기 실패:", err);
//     }
//   };

//   return (
//     <div className={styles.background}>
//       <div className={styles.modal}>
//         <p className={styles.title}>
//           시군구를 선택해 폭염 경보를 확인하세요.
//         </p>

//         <div className={styles.regionList}>
//           {Object.keys(regIdMap).map((region) => (
//             <button
//               key={region}
//               onClick={() => handleRegionSelect(region)}
//               className={`${styles.regionButton} ${
//                 selectedRegion === region ? styles.selected : ""
//               }`}
//             >
//               {region}
//             </button>
//           ))}
//         </div>

//         {alertData && (
//           <>
//             <p className={styles.title}>
//               오늘 <strong>{alertData.wrnmsg || "폭염주의보가 발령됩니다."}</strong>
//             </p>
//             <p className={styles.description}>
//               발령 위치 | {alertData.regionName}
//               <br />
//               발령 시간 | {alertData.tmFc || "알 수 없음"}
//               <br />
//               모든 여행자는 알림을 참고하여 여행 시 주의하고, 바깥 활동을 자제해주세요.
//             </p>
//             <button className={styles.primaryButton}>폭우 시 대처 요령 자세히 보기</button>
//             <button className={styles.secondaryButton}>오늘 하루 그만 보기</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
