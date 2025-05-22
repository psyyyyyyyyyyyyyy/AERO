import TopBackground from "../components/start/TopBackground";
import StartButtonGroup from "../components/start/StartButtonGroup";
import styles from "./startPage.module.css";

export default function StartPage() {
  return (
    <div className={styles.page}>
      <TopBackground />
      <div className={styles.container}>
        <h1 className={styles.title}>AERO</h1>
        <p className={styles.subtitle}>Accessible Every Route & Opportunity</p>
        <p className={styles.description}>모두가 할 수 있는 즐거운 여행</p>
        <div className={styles.indicator}>● ● ●</div>
        <StartButtonGroup />
      </div>
    </div>
  );
}

