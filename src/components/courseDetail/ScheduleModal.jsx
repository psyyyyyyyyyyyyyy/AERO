import styles from "./schedulemodal.module.css";

const schedule = [
  {
    time: "AM 10:00",
    title: "송도 센트럴파크 산책",
    location: "📍송도국제도시",
    description:
      "- 유럽 감성의 수상택시 & 자전거\n- 포토 명소 (대방 어반스퀘어)\n- 도심 속 여유로운 아침",
  },
  {
    time: "PM 12:00",
    title: "트리플스트리트 브런치",
    location: "📍송도 트리플스트리트",
    description:
      "- 감각적인 브런치 카페 & 쇼핑 거리\n- 루프탑, 앤티크 조명 분위기, 음료와 파스타\n- 한 입의 여유, 커피 한 잔에 너와의 대화 ☕",
  },
  {
    time: "PM 2:00",
    title: "아트플랫폼 & 차이나타운",
    location: "📍인천 아트플랫폼",
    description:
      "- 전시회, 벽화, 마켓 구경\n- 짜장면 거리 투어, 중국풍 골목 탐방\n- 복고 컨셉, 짬뽕 한 그릇, 웃음으로 가득한 우리",
  },
  {
    time: "PM 5:00",
    title: "월미도 바다 & 노을",
    location: "📍월미도",
    description:
      "- 유람선과 관람차, 바다 따라 걷기\n- 즉석 노래방, 동전 뽑기\n- 오늘의 피로보다 더 깊은 노을, 그 순간을 함께 해요 🌅",
  },
  {
    time: "PM 7:00",
    title: "영종도 드라이브 & 루프탑 카페",
    location: "📍영종도 을왕리 근처",
    description:
      "- 인천대교 야경 코스\n- 루프탑 라운지 카페와 커피\n- '오늘 하루의 마지막, 따뜻한 소리와 함께하는 둘만의 시간' 🌙",
  },
];

export default function ScheduleModal({ onClose }) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>💕 커플 필독! 하루 정복 인천 데이트</h3>
        <ul className={styles.scheduleList}>
          {schedule.map((item, i) => (
            <li key={i} className={styles.scheduleItem}>
              <div className={styles.time}>{item.time}</div>
              <div className={styles.textGroup}>
                <div className={styles.subTitle}>{item.title}</div>
                <div className={styles.location}>{item.location}</div>
                <pre className={styles.description}>{item.description}</pre>
              </div>
            </li>
          ))}
        </ul>
        <button className={styles.closeBtn} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
