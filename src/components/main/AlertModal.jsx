import { useEffect, useState } from "react";
import styles from "./alertModal.module.css";
import { fetchWeatherAlert } from "../../api/AlertApi";
import { FiChevronDown } from "react-icons/fi";

const REGION_MAP = {
  "서울, 인천, 경기도": 109,
  "부산, 울산, 경상남도": 159,
  "대구, 경상북도": 143,
  "광주, 전라남도": 156,
  전북자치도: 146,
  "대전, 세종, 충청남도": 133,
  충청북도: 131,
  강원도: 105,
  제주도: 184,
};

const DEFAULT_REGION = "서울, 인천, 경기도";

export default function AlertModal() {
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [alert, setAlert] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchWeatherAlert(region);
        const item = Array.isArray(items) ? items[0] : items;
        if (item) setAlert(item);
        console.log("기상 속보 데이터:", item);
      } catch (e) {
        console.warn("기상 속보 호출 실패", e);
      }
    };
    fetchData();
  }, [region]);

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <span className={styles.alertLabel}>알림</span>
        </div>

        <div className={styles.dropdownContainer}>
          <button
            className={styles.dropdownToggle}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            {region} <FiChevronDown/>
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {Object.keys(REGION_MAP).map((r) => (
                <div
                  key={r}
                  className={styles.dropdownItem}
                  onClick={() => {
                    setRegion(r);
                    setIsDropdownOpen(false);
                  }}
                >
                  {r}
                </div>
              ))}
            </div>
          )}
        </div>

        {alert ? (
          <>
            <p className={styles.title}>
              오늘 <strong>{alert.t1 || "기상 속보가 있습니다."}</strong>
            </p>
            <p className={styles.description}>
              <strong>발령 위치</strong> | {region}
              <br />
              <strong>발령 시간</strong> |{" "}
              {formatTime(alert.t5) || formatTime(alert.tmFc) || "알 수 없음"}
              <br />
              {isExpanded ? (
                <>
                  <strong>해당 구역</strong> | {alert.t2 || "-"}
                  <br />
                  <strong>발효 시각</strong> | {alert.t3 || "-"}
                  <br />
                  <strong>특보 현황</strong> | {alert.t6 || "-"}
                  <br />
                  <strong>예비 특보</strong> | {alert.t7 || "-"}
                  <br />
                  <strong>기타 정보</strong> | {alert.other || "-"}
                  <br />
                  <br />
                  모든 여행자는 알림을 참고하여 여행 시 주의하세요.
                  <br />
                  해당 알림은 기상청에서 제공하는 기상특보정보 조회서비스 API를
                  이용하였습니다.
                  <div className={styles.expandWrapper}>
                    <span
                      className={styles.expandToggle}
                      onClick={() => setIsExpanded(false)}
                    >
                      접기
                    </span>
                  </div>
                </>
              ) : (
                <div className={styles.expandWrapper}>
                  <span
                    className={styles.expandToggle}
                    onClick={() => setIsExpanded(true)}
                  >
                    펼치기
                  </span>
                </div>
              )}
            </p>
          </>
        ) : (
          <p className={styles.title}>아직 기상 속보가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

function formatTime(value) {
  const str = String(value);
  if (!str || str.length !== 12) return null;
  return str.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5");
}
