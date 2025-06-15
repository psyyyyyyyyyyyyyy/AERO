import styles from "./spotBarrierFree.module.css";

export default function SpotBarrierFree({ info }) {
  if (!info) return null;

  const renderField = (label, value) => {
    if (!value?.trim()) return null;
    return (
      <li className={styles.item}>
        <strong>{label}</strong>
        <span>{value.replace(/<br\s*\/?>(\s)?/g, " ")}</span>
      </li>
    );
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>♿ 편의시설 안내</h2>
      <ul className={styles.list}>
        {renderField("장애인 주차장", info.parking)}
        {renderField("출입로", info.route)}
        {renderField("접근성", info.publictransport)}
        {renderField("안내소", info.ticketoffice)}
        {renderField("휠체어", info.wheelchair)}
        {renderField("유도 안내", info.guidesystem)}
        {renderField("점자블록", info.braileblock)}
        {renderField("점자 홍보물", info.brailepromotion)}
        {renderField("수화 안내인", info.guidehuman)}
        {renderField("엘리베이터", info.elevator)}
        {renderField("화장실", info.restroom)}
        {renderField("유아 휴게실", info.lactationroom)}
        {renderField("청각 장애인 편의", info.hearinghandicapetc)}
        {renderField("기타 장애인 편의사항", info.handicapetc)}
      </ul>
    </section>
  );
}
