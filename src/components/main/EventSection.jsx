import styles from "./eventSection.module.css";

export default function EventSection() {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>행사</h3>
      <div className={styles.event}>
        <div className={styles.image}></div>
        <div>
          <h4>무슨무슨 경복 축제</h4>
          <p>경복의 어딘가에서 하는 아주 특별한 축제 어쩌고저쩌고</p>
          <div className={styles.buttons}>
            <button>상세보기</button>
            <button>전화 예약하기</button>
          </div>
        </div>
      </div>
    </section>
  );
}
